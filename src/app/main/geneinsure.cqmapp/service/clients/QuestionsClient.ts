import {HttpClient, HttpResponse} from '@angular/common/http';
import {Question} from '../models/Question';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

export class QuestionsClient {

    private httpObserveOption = {observe: 'response' as const};
    private readonly baseURL = environment.baseUrl;
    private readonly questionsUrl = this.baseURL + '/questions';

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP POST /questions
     * Service method: QuestionsController.create
     */
    createQuestion(newQuestion: Question): Observable<HttpResponse<void>> {
        return this.httpClient.post<void>(`${this.questionsUrl}`, newQuestion, this.httpObserveOption);
    }

    /**
     * HTTP GET /questions
     * Service method: QuestionsController.getAll
     */
    getQuestions(): Observable<HttpResponse<Question[]>> {
        return this.httpClient.get<Question[]>(this.questionsUrl, this.httpObserveOption);
    }

    /**
     * HTTP GET /questions/count
     * Service method: QuestionsController.count
     */
    countQuestions(): Observable<HttpResponse<number>> {
        return this.httpClient.get<number>(`${this.questionsUrl}/count`, this.httpObserveOption);
    }

    /**
     * HTTP GET /questions/{id}
     * Service method: QuestionsController.get
     */
    getQuestion(id: string): Observable<HttpResponse<Question>> {
        return this.httpClient.get<Question>(`${this.questionsUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP DELETE /questions/{id}
     * Service method: QuestionsController.remove
     */
    removeQuestion(id: string): Observable<HttpResponse<void>> {
        return this.httpClient.delete<void>(`${this.questionsUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP PUT /questions/{id}
     * Service method: QuestionsController.update
     */
    updateQuestion(question: Question): Observable<HttpResponse<void>> {
        return this.httpClient.put<void>(this.questionsUrl, question, this.httpObserveOption);
    }
}
