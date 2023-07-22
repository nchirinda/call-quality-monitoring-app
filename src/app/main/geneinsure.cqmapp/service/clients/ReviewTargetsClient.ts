import {HttpClient, HttpResponse} from '@angular/common/http';
import {ReviewTarget} from '../models/ReviewTarget';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

export class ReviewTargetsClient {

    private httpObserveOption = {observe: 'response' as const};
    private readonly baseURL = environment.baseUrl;
    private readonly reviewTargetsUrl = this.baseURL + '/review_targets';

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP POST /reviewTargets
     * Service method: ReviewTargetsController.create
     */
    createReviewTarget(newReviewTarget: ReviewTarget): Observable<HttpResponse<void>> {
        return this.httpClient.post<void>(`${this.reviewTargetsUrl}`, newReviewTarget, this.httpObserveOption);
    }

    /**
     * HTTP GET /reviewTargets
     * Service method: ReviewTargetsController.getAll
     */
    getReviewTargets(): Observable<HttpResponse<ReviewTarget[]>> {
        return this.httpClient.get<ReviewTarget[]>(this.reviewTargetsUrl, this.httpObserveOption);
    }

    /**
     * HTTP GET /reviewTargets/count
     * Service method: ReviewTargetsController.count
     */
    countReviewTargets(): Observable<HttpResponse<number>> {
        return this.httpClient.get<number>(`${this.reviewTargetsUrl}/count`, this.httpObserveOption);
    }

    /**
     * HTTP GET /reviewTargets/{id}
     * Service method: ReviewTargetsController.get
     */
    getReviewTarget(id: string): Observable<HttpResponse<ReviewTarget>> {
        return this.httpClient.get<ReviewTarget>(`${this.reviewTargetsUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP DELETE /reviewTargets/{id}
     * Service method: ReviewTargetsController.remove
     */
    removeReviewTarget(id: string): Observable<HttpResponse<void>> {
        return this.httpClient.delete<void>(`${this.reviewTargetsUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP PUT /reviewTargets/{id}
     * Service method: ReviewTargetsController.update
     */
    updateReviewTarget(reviewTarget: ReviewTarget): Observable<HttpResponse<void>> {
        return this.httpClient.put<void>(this.reviewTargetsUrl, reviewTarget, this.httpObserveOption);
    }
}
