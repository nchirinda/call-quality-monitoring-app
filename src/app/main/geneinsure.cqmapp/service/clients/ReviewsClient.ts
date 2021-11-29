import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {Review} from '../models/Review';
import {ServiceResponse} from './payload/ServiceResponse';

export class ReviewsClient {

    private httpObserveOption = {observe: 'response' as const};
    private readonly baseURL = environment.baseUrl;
    private readonly reviewsUrl = this.baseURL + '/reviews';

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP POST /reviews
     * Service method: ReviewsController.create
     */
    createReview(newReview: Review): Observable<HttpResponse<ServiceResponse>> {
        return this.httpClient.post<ServiceResponse>(`${this.reviewsUrl}`, newReview, this.httpObserveOption);
    }

    /**
     * HTTP GET /reviews
     * Service method: ReviewsController.getAll
     */
    getReviews(): Observable<HttpResponse<Review[]>> {
        return this.httpClient.get<Review[]>(this.reviewsUrl, this.httpObserveOption);
    }

    /**
     * HTTP GET /customer/reviews
     * Service method: ReviewsController.getCustomerReviews
     */
    getUserReviews(userId: string): Observable<HttpResponse<Review[]>> {
        return this.httpClient.get<Review[]>(`${this.reviewsUrl}/user/${userId}`, this.httpObserveOption);
    }

    /**
     * HTTP GET /reviews/count
     * Service method: ReviewsController.count
     */
    countReviews(): Observable<HttpResponse<number>> {
        return this.httpClient.get<number>(`${this.reviewsUrl}/count`, this.httpObserveOption);
    }

    /**
     * HTTP GET /reviews/{id}
     * Service method: ReviewsController.get
     */
    getReview(id: string): Observable<HttpResponse<Review>> {
        return this.httpClient.get<Review>(`${this.reviewsUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP DELETE /reviews/{id}
     * Service method: ReviewsController.remove
     */
    removeReview(id: string): Observable<HttpResponse<void>> {
        return this.httpClient.delete<void>(`${this.reviewsUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP PUT /reviews/{id}
     * Service method: ReviewsController.update
     */
    updateReview(review: Review): Observable<HttpResponse<void>> {
        return this.httpClient.put<void>(`${this.reviewsUrl}/${review.id}`, review, this.httpObserveOption);
    }
}
