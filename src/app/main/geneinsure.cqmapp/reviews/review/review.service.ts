import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Review} from '../../service/models/Review';
import {ReviewsClient} from '../../service/clients/ReviewsClient';
import {filter, map, tap} from 'rxjs/operators';
import {Question} from '../../service/models/Question';
import {QuestionCategory} from '../../service/models/QuestionCategory';
import {QuestionsClient} from '../../service/clients/QuestionsClient';
import {QuestionCategoriesClient} from '../../service/clients/QuestionCategoriesClient';
import {ReviewTarget} from '../../service/models/ReviewTarget';
import {ReviewTargetsClient} from '../../service/clients/ReviewTargetsClient';
import {User} from '../../service/models/User';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class ReviewService implements Resolve<Review> {

    // ------------------------------[ PRIVATE FIELDS ]-----------------------------------
    private onReviewChanged: BehaviorSubject<Review> = new BehaviorSubject<Review>(null);
    private onReviewTargetsChanged: BehaviorSubject<ReviewTarget[]> = new BehaviorSubject<ReviewTarget[]>([]);
    private onQuestionsChanged: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
    private onQuestionCategoriesChanged: BehaviorSubject<QuestionCategory[]> = new BehaviorSubject<QuestionCategory[]>([]);

    // ------------------------------[ PUBLIC PROPERTIES ]--------------------------------
    public reviewData: Observable<Review> = this.onReviewChanged.asObservable();
    public reviewTargetsData: Observable<ReviewTarget[]> = this.onReviewTargetsChanged.asObservable();
    public questionsData: Observable<Question[]> = this.onQuestionsChanged.asObservable();
    public questionCategoriesData: Observable<QuestionCategory[]> = this.onQuestionCategoriesChanged.asObservable();

    userProfile: User;
    userProfileLoaded: boolean;
    routeParams: any;
    review: Review;

    constructor(
        private authService: AuthService,
        private reviewsClient: ReviewsClient,
        private reviewTargetsClient: ReviewTargetsClient,
        private questionsClient: QuestionsClient,
        private questionCategoriesClient: QuestionCategoriesClient,
    ) {
        this.userProfileLoaded = false;
        this._init();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ PRIVATE METHODS
    // -----------------------------------------------------------------------------------------------------

    private _init(): void {
        this.authService.userProfile
            .pipe(
                filter((value) => (value !== null && value !== undefined))
            )
            .subscribe((resp: User) => {
                this.userProfile = resp;
                this.userProfileLoaded = true;
            });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ PUBLIC METHODS
    // -----------------------------------------------------------------------------------------------------

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        if (!this.userProfileLoaded) {
            this.authService.redirectUrl = state.url;
            this.authService.loadUserProfile();
        }

        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getReview(),
                this.getReviewTargets().subscribe(),
                this.getQuestions().subscribe(),
                this.getQuestionCategories().subscribe(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getReview(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (this.routeParams.id === 'new') {
                this.onReviewChanged.next(null);
                resolve(false);
            } else {
                this.reviewsClient.getReview(this.routeParams.id)
                    .pipe(
                        map((resp) => resp.body),
                    )
                    .subscribe((value) => {
                        this.onReviewChanged.next(value);
                        resolve(value);
                    }, reject);
            }
        });
    }

    getReviewTargets(): Observable<ReviewTarget[]> {
        return this.reviewTargetsClient.getReviewTargets()
            .pipe(
                map((resp) => resp.body),
                tap((value) => this.onReviewTargetsChanged.next(value))
            );
    }

    getQuestions(): Observable<Question[]> {
        return this.questionsClient.getQuestions()
            .pipe(
                map((resp) => resp.body),
                tap((value) => this.onQuestionsChanged.next(value))
            );
    }

    getQuestionCategories(): Observable<QuestionCategory[]> {
        return this.questionCategoriesClient.getQuestionCategories()
            .pipe(
                map((resp) => resp.body),
                tap((value) => this.onQuestionCategoriesChanged.next(value))
            );
    }

    saveReview(review: Review): Promise<any> {
        return new Promise((resolve, reject) => {
            this.reviewsClient.updateReview(review)
                .subscribe((response: any) => {
                    // Trigger the subscription with new data
                    this.onReviewChanged.next(review);
                    resolve(response);
                }, reject);
        });
    }
}
