import {HttpClient, HttpResponse} from '@angular/common/http';
import {QuestionCategory} from '../models/QuestionCategory';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

export class QuestionCategoriesClient {

    private httpObserveOption = {observe: 'response' as const};
    private readonly baseURL = environment.baseUrl;
    private readonly questionCategoriesUrl = this.baseURL + '/question_categories';

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP POST /questionCategories
     * Service method: QuestionCategoriesController.create
     */
    createQuestionCategory(newQuestionCategory: QuestionCategory): Observable<HttpResponse<void>> {
        return this.httpClient.post<void>(`${this.questionCategoriesUrl}`, newQuestionCategory, this.httpObserveOption);
    }

    /**
     * HTTP GET /questionCategories
     * Service method: QuestionCategoriesController.getAll
     */
    getQuestionCategories(): Observable<HttpResponse<QuestionCategory[]>> {
        return this.httpClient.get<QuestionCategory[]>(this.questionCategoriesUrl, this.httpObserveOption);
    }

    /**
     * HTTP GET /questionCategories/count
     * Service method: QuestionCategoriesController.count
     */
    countQuestionCategories(): Observable<HttpResponse<number>> {
        return this.httpClient.get<number>(`${this.questionCategoriesUrl}/count`, this.httpObserveOption);
    }

    /**
     * HTTP GET /questionCategories/{id}
     * Service method: QuestionCategoriesController.get
     */
    getQuestionCategory(id: string): Observable<HttpResponse<QuestionCategory>> {
        return this.httpClient.get<QuestionCategory>(`${this.questionCategoriesUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP DELETE /questionCategories/{id}
     * Service method: QuestionCategoriesController.remove
     */
    removeQuestionCategory(id: string): Observable<HttpResponse<void>> {
        return this.httpClient.delete<void>(`${this.questionCategoriesUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP PUT /questionCategories/{id}
     * Service method: QuestionCategoriesController.update
     */
    updateQuestionCategory(questionCategory: QuestionCategory): Observable<HttpResponse<void>> {
        return this.httpClient.put<void>(this.questionCategoriesUrl, questionCategory, this.httpObserveOption);
    }
}
