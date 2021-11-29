import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Review} from '../../service/models/Review';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {ReviewService} from './review.service';
import {Question} from '../../service/models/Question';
import {QuestionCategory} from '../../service/models/QuestionCategory';
import {Answer} from '../../service/models/Answer';
import {AnswerType} from '../../service/models/enums/AnswerType';
import {ReviewTarget} from '../../service/models/ReviewTarget';
import {Router} from '@angular/router';

@Component({
    selector: 'app-review-details',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReviewComponent implements OnInit, OnDestroy {

    // ------------------------------[ PUBLIC PROPERTIES ]--------------------------------
    review: Review;
    pageType: string;
    reviewForm: FormGroup;
    questions: Question[] = [];
    questionCategories: QuestionCategory[] = [];
    answers: Answer[] = [];
    reviewTargets: ReviewTarget[] = [];

    greetingQstns: Question[];
    handlingContactQstns: Question[];
    solutionInfoQstns: Question[];
    notificationsQstns: Question[];
    telephonyQstns: Question[];
    softSkillsQstns: Question[];
    endCallQstns: Question[];

    yesNoOptions: any[] = [{option: 'YES', value: 1}, {option: 'NO', value: 0}, {option: 'N/A', value: 'N/A'}];
    rangeOptions: any[] = [{option: '1', value: 1}, {option: '2', value: 2}, {option: '3', value: 3},
        {option: '4', value: 4}, {option: '5', value: 5}, {option: '6', value: 6}, {option: '7', value: 7},
        {option: '8', value: 8}, {option: '9', value: 9}, {option: '10', value: 10}, {option: 'N/A', value: 'N/A'}];
    response: string;

    // ------------------------------[ PRIVATE FIELDS ]-----------------------------------

    private ngUnSubscribeAll: Subject<any>;

    constructor(
        private _reviewService: ReviewService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _matSnackBar: MatSnackBar
    ) {
        // Set the default
        this.ngUnSubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ LIFECYCLE HOOKS
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {

        if (this._router.url.includes('edit')) {
            console.log('Edit Mode');
            this.pageType = 'edit';
        } else if (this._router.url.includes('create')) {
            console.log('Create Mode');
            this.pageType = 'create';
        }

        this._reviewService.reviewData
            .pipe(takeUntil(this.ngUnSubscribeAll))
            .subscribe(review => {
                this.review = review;
                this.reviewForm = this.createReviewForm();
            });

        this._reviewService.reviewTargetsData
            .pipe(takeUntil(this.ngUnSubscribeAll))
            .subscribe((reviewTargets) => {
                this.reviewTargets = reviewTargets;
            });

        this._reviewService.questionCategoriesData
            .pipe(takeUntil(this.ngUnSubscribeAll))
            .subscribe((questionCategories) => {
                this.questionCategories = questionCategories;
            });

        this._reviewService.questionsData
            .pipe(takeUntil(this.ngUnSubscribeAll))
            .subscribe((reviewQuestions) => {
                this.questions = reviewQuestions.sort((n1, n2) => n1.number - n2.number);

                if (this.questions) {
                    this.greetingQstns = this.questions.filter(q => q.questionCategory.name === 'Greeting');
                    this.handlingContactQstns = this.questions.filter(q => q.questionCategory.name === 'Handling Contact');
                    this.solutionInfoQstns = this.questions.filter(q => q.questionCategory.name === 'Solution Information');
                    this.notificationsQstns = this.questions.filter(q => q.questionCategory.name === 'Notifications');
                    this.telephonyQstns = this.questions.filter(q => q.questionCategory.name === 'Telephony Skills');
                    this.softSkillsQstns = this.questions.filter(q => q.questionCategory.name === 'Soft Skills');
                    this.endCallQstns = this.questions.filter(q => q.questionCategory.name === 'End Call');
                }

                if (this.pageType === 'create') {
                    // Populate Form with the question controls
                    this.questions.forEach(
                        q => this.reviewForm.addControl('question' + q.number, new FormControl('N/A', Validators.required))
                    );
                } else if (this.pageType === 'edit') {
                    // Populate Form with the question controls and their answers
                    this.questions.forEach(q => {
                        const qAns: Answer = this.review.answers.find(ans => ans.question.id === q.id);
                        this.reviewForm.addControl('question' + q.number, new FormControl(qAns.score, Validators.required));
                        }
                    );
                }

                // Create default Answers for the Review
                this.createDefaultAnswers(this.questions);
            });

        // Listen to the form field changes to update the Score
        this.reviewForm.valueChanges
            .pipe(takeUntil(this.ngUnSubscribeAll))
            .subscribe(() => {
                this.updateReviewScores();
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.ngUnSubscribeAll.next();
        this.ngUnSubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ PUBLIC METHODS
    // -----------------------------------------------------------------------------------------------------

    createReviewForm(): FormGroup {
        // just initialise an empty form
        return this._formBuilder.group({});
    }

    createDefaultAnswers(questions: Question[]): void {

        if (this.pageType === 'create') {
            const qAnswers: Answer[] = [];

            questions.forEach(q => {
                const ans: Answer = new Answer();
                ans.answerType = q.answerType;
                ans.maxPossible = 0;
                ans.maxScore = 0;
                ans.question = q;
                ans.score = 0;
                qAnswers.push(ans);
            });

            this.answers.push(...qAnswers);

            // Add the Answers to the review
            this.review.answers = this.answers;
        } else if (this.pageType === 'edit') {

        }
    }

    updateReviewScores(): void {
        // Reset the previous review scores
        this.review.totalScore = 0;
        this.review.maxPossibleScore = 0;
        this.review.reviewTarget = this.reviewTargets.find(rt => rt.maxPercentage === 0);

        // Update each answer with the score
        this.review.answers.forEach(ans => {
            const optionValue: any = this.reviewForm.get('question' + ans.question.number).value;

            ans.score = optionValue === 'N/A' ? 0 : optionValue;

            // Set the maximum based on YES_NO selection
            if (ans.answerType === AnswerType.YES_NO && optionValue === 'N/A') {
                ans.maxPossible = 0;
            } else if (ans.answerType === AnswerType.YES_NO) {
                ans.maxPossible = 1;
            }

            // Set the maximum based on RANGE selection
            if (ans.answerType === AnswerType.RANGE && optionValue === 'N/A') {
                ans.maxPossible = 0;
            } else if (ans.answerType === AnswerType.RANGE) {
                ans.maxPossible = 10;
            }

            // Update the review score
            this.review.totalScore += ans.score;
            this.review.maxPossibleScore += ans.maxPossible;
        });

        // Calculate the Review Percentage score
        this.review.percentageScore = (this.review.totalScore / this.review.maxPossibleScore) * 100;

        // Convert to 1 decimal place
        this.review.percentageScore = Number((this.review.percentageScore).toFixed(1));

        this.reviewTargets.forEach(rt => {
            if (this.review.percentageScore >= rt.minPercentage && this.review.percentageScore < rt.maxPercentage) {
                this.review.reviewTarget = rt;
            }
        });

        // Handle max percentage out of range tested above
        if (this.review.percentageScore === 100) {
            this.review.reviewTarget = this.reviewTargets.find(rt => rt.maxPercentage === 100);
        }
    }

    saveReview(): void {
        this._reviewService.saveReview(this.review)
            .then(() => {

                this._matSnackBar.open('Review Saved Successfully', 'OK', {
                    verticalPosition: 'top',
                    duration: 5000
                });

                this._router.navigate(['/reviews']).then();
            });
    }
}
