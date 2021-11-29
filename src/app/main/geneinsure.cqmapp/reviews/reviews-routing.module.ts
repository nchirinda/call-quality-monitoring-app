import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReviewsListComponent} from './reviews-list/reviews-list.component';
import {ReviewsService} from './reviews-list/reviews.service';
import {ReviewComponent} from './review/review.component';
import {ReviewService} from './review/review.service';

const routes: Routes = [
    {
        path: '', component: ReviewsListComponent,
        data: {title: 'Reviews :: Call Quality Monitoring App'},
        resolve: {data: ReviewsService},
    },
    {
        path: 'create/:id', component: ReviewComponent,
        data: {title: 'Create Review :: Call Quality Monitoring App'},
        resolve: {data: ReviewService},
    },
    {
        path: 'edit/:id', component: ReviewComponent,
        data: {title: 'Edit Review :: Call Quality Monitoring App'},
        resolve: {data: ReviewService},
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReviewsRoutingModule {
}
