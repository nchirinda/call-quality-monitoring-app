import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReviewsRoutingModule} from './reviews-routing.module';
import {ReviewsListComponent} from './reviews-list/reviews-list.component';
import {ReviewComponent} from './review/review.component';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {MaterialModule} from '../../../material.module';
import {NewReviewFormDialogComponent} from './new-review-form/new-review-form.component';
import {ReviewsClient} from '../service/clients/ReviewsClient';
import {QuestionsClient} from '../service/clients/QuestionsClient';
import {QuestionCategoriesClient} from '../service/clients/QuestionCategoriesClient';
import {ReviewService} from './review/review.service';
import {ReviewsService} from './reviews-list/reviews.service';


@NgModule({
    declarations: [ReviewsListComponent, ReviewComponent, NewReviewFormDialogComponent],
    imports: [
        CommonModule,
        ReviewsRoutingModule,
        FuseSharedModule,
        MaterialModule
    ],
    entryComponents: [
        NewReviewFormDialogComponent,
    ],
    providers: [
        ReviewsService,
        ReviewService,
        ReviewsClient,
        QuestionsClient,
        QuestionCategoriesClient
    ]
})
export class ReviewsModule {
}
