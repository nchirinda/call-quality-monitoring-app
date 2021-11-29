import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {Review} from '../../service/models/Review';
import {ReviewsClient} from '../../service/clients/ReviewsClient';
import {User} from '../../service/models/User';
import {AuthService} from '../../auth/auth.service';
import {Agent} from '../../service/models/Agent';
import {Supervisor} from '../../service/models/Supervisor';
import {AgentsClient} from '../../service/clients/AgentsClient';
import {SupervisorsClient} from '../../service/clients/SupervisorsClient';
import {ServiceResponse} from '../../service/clients/payload/ServiceResponse';
import {Customer} from '../../service/models/Customer';
import {CustomersClient} from '../../service/clients/CustomersClient';
import {ReviewTarget} from '../../service/models/ReviewTarget';
import {ReviewTargetsClient} from '../../service/clients/ReviewTargetsClient';

@Injectable({
    providedIn: 'root'
})
export class ReviewsService implements Resolve<Review> {

    // ------------------------------[ PRIVATE FIELDS ]-----------------------------------
    private onReviewsChanged: BehaviorSubject<Review[]> = new BehaviorSubject<Review[]>([]);
    private onReviewTargetsChanged: BehaviorSubject<ReviewTarget[]> = new BehaviorSubject<ReviewTarget[]>([]);
    private onAgentsChanged: BehaviorSubject<Agent[]> = new BehaviorSubject<Agent[]>([]);
    private onSupervisorsChanged: BehaviorSubject<Supervisor[]> = new BehaviorSubject<Supervisor[]>([]);
    private onCustomersChanged: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

    // ------------------------------[ PUBLIC PROPERTIES ]--------------------------------
    public reviewsData: Observable<Review[]> = this.onReviewsChanged.asObservable();
    public reviewTargetsData: Observable<ReviewTarget[]> = this.onReviewTargetsChanged.asObservable();
    public agentsData: Observable<Agent[]> = this.onAgentsChanged.asObservable();
    public supervisorsData: Observable<Supervisor[]> = this.onSupervisorsChanged.asObservable();
    public customersData: Observable<Customer[]> = this.onCustomersChanged.asObservable();

    userProfile: User;
    userProfileLoaded: boolean;

    constructor(
        private router: Router,
        private reviewsClient: ReviewsClient,
        private reviewTargetsClient: ReviewTargetsClient,
        private agentsClient: AgentsClient,
        private supervisorsClient: SupervisorsClient,
        private customersClient: CustomersClient,
        private authService: AuthService,
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

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getReviews().subscribe(),
                this.getReviewTargets().subscribe(),
                this.getAgents().subscribe(),
                this.getSupervisors().subscribe(),
                this.getCustomers().subscribe(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getReviews(): Observable<Review[]> {
        return this.reviewsClient.getUserReviews(this.userProfile.id)
            .pipe(
                map((resp) => resp.body),
                tap((value) => this.onReviewsChanged.next(value))
            );
    }

    getReviewTargets(): Observable<ReviewTarget[]> {
        return this.reviewTargetsClient.getReviewTargets()
            .pipe(
                map((resp) => resp.body),
                tap((value) => this.onReviewTargetsChanged.next(value))
            );
    }

    getAgents(): Observable<Agent[]> {
        return this.agentsClient.getAgents()
            .pipe(
                map((resp) => resp.body),
                tap((value) => this.onAgentsChanged.next(value))
            );
    }

    getSupervisors(): Observable<Supervisor[]> {
        return this.supervisorsClient.getSupervisors()
            .pipe(
                map((resp) => resp.body),
                tap((value) => this.onSupervisorsChanged.next(value))
            );
    }

    getCustomers(): Observable<Customer[]> {
        return this.customersClient.getCustomers()
            .pipe(
                map((resp) => resp.body),
                tap((value) => this.onCustomersChanged.next(value))
            );
    }

    createReview(newReview: Review): Observable<ServiceResponse> {
        return this.reviewsClient.createReview(newReview)
            .pipe(
                map(resp => resp.body)
            );
    }
}
