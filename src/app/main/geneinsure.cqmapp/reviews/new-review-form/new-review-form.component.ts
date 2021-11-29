import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Review} from '../../service/models/Review';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {pastReviewDateValidator} from '../../shared/form-validators';
import * as FormUtils from '../../shared/form-utils';
import {Supervisor} from '../../service/models/Supervisor';
import {Agent} from '../../service/models/Agent';
import {takeUntil} from 'rxjs/operators';
import {ReviewsService} from '../reviews-list/reviews.service';
import {Subject} from 'rxjs';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {Customer} from '../../service/models/Customer';
import {ReviewTarget} from '../../service/models/ReviewTarget';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-new-review-form',
    templateUrl: './new-review-form.component.html',
    styleUrls: ['./new-review-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NewReviewFormDialogComponent implements OnInit {

    action: string;
    dialogTitle: string;
    review: Review;
    newReviewForm: FormGroup;

    reviewTargets: ReviewTarget[];
    agents: Agent[];
    supervisors: Supervisor[];
    customers: Customer[];

    private ngUnSubscribeAll: Subject<any>;

    constructor(
        public matDialogRef: MatDialogRef<NewReviewFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private reviewsService: ReviewsService
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Review';
            this.review = _data.review;
        } else {
            this.dialogTitle = 'Open Review';
            this.review = new Review();
        }

        this.newReviewForm = this.createNewReviewForm();
        this.ngUnSubscribeAll = new Subject();
    }

    ngOnInit(): void {

        this.reviewsService.agentsData
            .pipe(takeUntil(this.ngUnSubscribeAll))
            .subscribe((agents) => {
                this.agents = agents;
            });

        this.reviewsService.supervisorsData
            .pipe(takeUntil(this.ngUnSubscribeAll))
            .subscribe((supervisors) => {
                this.supervisors = supervisors;
            });

        this.reviewsService.customersData
            .pipe(takeUntil(this.ngUnSubscribeAll))
            .subscribe((customers) => {
                this.customers = customers;
            });

        this.reviewsService.reviewTargetsData
            .pipe(takeUntil(this.ngUnSubscribeAll))
            .subscribe((reviewTargets) => {
                this.reviewTargets = reviewTargets;
            });

        // Listen to the 'agent' field changes to update the Supervisor field
        this.newReviewForm.get('agent').valueChanges
            .pipe(takeUntil(this.ngUnSubscribeAll))
            .subscribe(() => {
                const selectedAgentId = this.newReviewForm.get('agent').value;
                this.onAgentSelected(selectedAgentId);
            });
    }

    createNewReviewForm(): FormGroup {
        return this._formBuilder.group({
            agent: ['', Validators.required],
            supervisor: ['', Validators.required],
            reviewDate: ['', [Validators.required, pastReviewDateValidator()]],
            callReference: ['', Validators.required],
            callRecordingReference: ['', Validators.required],
            customer: ['', Validators.required],
        });
    }

    reset(form: FormGroup): void {
        form.reset();
    }

    private onAgentSelected(agentId: string): void {
        const selectedAgent = this.agents.find(agent => agent.id === agentId);

        if (selectedAgent) {
            this.newReviewForm.get('supervisor').setValue(selectedAgent.supervisor.id);
            this.newReviewForm.get('supervisor').updateValueAndValidity();
        }
    }

    onSubmit(): void {

        if (this.newReviewForm.valid) {

            console.log(this.newReviewForm.getRawValue());

            const reviewDetails = this.newReviewForm.getRawValue();
            reviewDetails.agent = {id: reviewDetails.agent};
            reviewDetails.supervisor = {id: reviewDetails.supervisor};
            reviewDetails.customer = {id: reviewDetails.customer};
            reviewDetails.reviewDate = FormUtils.formatDateToISO(
                new Date(this.newReviewForm.get('reviewDate').value)
            );
            const newReview: Review = reviewDetails;
            newReview.totalScore = 0;
            newReview.maxPossibleScore = 0;
            newReview.percentageScore = 0;
            newReview.reviewTarget = this.reviewTargets.find(rt => rt.maxPercentage === 0);

            this.reviewsService.createReview(newReview)
                .subscribe((resp) => {
                        console.log('Successfully created NewReview! ID=' + resp.message);

                        // Clean up the forms
                        this.reset(this.newReviewForm);

                        this.matDialogRef.close({result: 'proceed', reviewId: resp.message});
                    },
                    (errorResp) => {
                        console.log('Failed to create NewReview: ' + errorResp);

                        this._matSnackBar.open('Failed to create New Review', 'OK', {
                            verticalPosition: 'top',
                            duration: 5000
                        });
                    }
                );
        }
    }
}
