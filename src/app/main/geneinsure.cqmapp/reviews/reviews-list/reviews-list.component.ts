import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {ReviewsService} from './reviews.service';
import {Review} from '../../service/models/Review';
import {NewReviewFormDialogComponent} from '../new-review-form/new-review-form.component';
import {Router} from '@angular/router';

@Component({
    selector: 'reviews-list',
    templateUrl: './reviews-list.component.html',
    styleUrls: ['./reviews-list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ReviewsListComponent implements OnInit, AfterViewInit, OnDestroy {

    // ------------------------------[ PUBLIC PROPERTIES ]--------------------------------

    @ViewChild('filter', {static: true}) filter: ElementRef;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    dataSource: MatTableDataSource<Review>;
    displayedColumns = ['reviewDate', 'callReference', 'callRecordingReference', 'agentName', 'supervisorName', 'score', 'customerNum'];

    // ------------------------------[ PRIVATE FIELDS ]-----------------------------------

    private ngUnSubscribeAll: Subject<any>;

    constructor(
        private _matDialog: MatDialog,
        private _matSnackBar: MatSnackBar,
        private router: Router,
        private reviewsService: ReviewsService
    ) {
        this.dataSource = new MatTableDataSource<Review>();
        this.ngUnSubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ LIFECYCLE HOOKS
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {

        this.reviewsService.reviewsData
            .pipe(takeUntil(this.ngUnSubscribeAll))
            .subscribe((reviews) => {
                this.dataSource.data = reviews;
            });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => {
            this.paginator.pageIndex = 0;
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

    newReview(): void {
        const employeeFormDialog = this._matDialog.open(NewReviewFormDialogComponent, {
            panelClass: 'review-form-dialog',
            data: {
                action: 'new'
            }
        });

        employeeFormDialog.afterClosed().subscribe(dialogResult => {

            if (dialogResult.result === 'proceed') {
                this._matSnackBar.open('New review has been opened, please proceed to update review answers', 'OK', {
                    verticalPosition: 'top',
                    duration: 5000
                });

                this.router.navigate([`/reviews/create/${dialogResult.reviewId}`]).then();

            } else {
                console.log('Cancelled', 'Open New Review has been cancelled!');

                this._matSnackBar.open('Open New Review has been cancelled', 'OK', {
                    verticalPosition: 'top',
                    duration: 5000
                });
            }
        });
    }
}
