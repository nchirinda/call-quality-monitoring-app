import {HttpClient, HttpResponse} from '@angular/common/http';
import {Supervisor} from '../models/Supervisor';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

export class SupervisorsClient {

    private httpObserveOption = {observe: 'response' as const};
    private readonly baseURL = environment.baseUrl;
    private readonly supervisorsUrl = this.baseURL + '/supervisors';

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP POST /supervisors
     * Service method: SupervisorsController.create
     */
    createSupervisor(newSupervisor: Supervisor): Observable<HttpResponse<void>> {
        return this.httpClient.post<void>(`${this.supervisorsUrl}`, newSupervisor, this.httpObserveOption);
    }

    /**
     * HTTP GET /supervisors
     * Service method: SupervisorsController.getAll
     */
    getSupervisors(): Observable<HttpResponse<Supervisor[]>> {
        return this.httpClient.get<Supervisor[]>(this.supervisorsUrl, this.httpObserveOption);
    }

    /**
     * HTTP GET /supervisors/count
     * Service method: SupervisorsController.count
     */
    countSupervisors(): Observable<HttpResponse<number>> {
        return this.httpClient.get<number>(`${this.supervisorsUrl}/count`, this.httpObserveOption);
    }

    /**
     * HTTP GET /supervisors/{id}
     * Service method: SupervisorsController.get
     */
    getSupervisor(id: string): Observable<HttpResponse<Supervisor>> {
        return this.httpClient.get<Supervisor>(`${this.supervisorsUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP DELETE /supervisors/{id}
     * Service method: SupervisorsController.remove
     */
    removeSupervisor(id: string): Observable<HttpResponse<void>> {
        return this.httpClient.delete<void>(`${this.supervisorsUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP PUT /supervisors/{id}
     * Service method: SupervisorsController.update
     */
    updateSupervisor(supervisor: Supervisor): Observable<HttpResponse<void>> {
        return this.httpClient.put<void>(this.supervisorsUrl, supervisor, this.httpObserveOption);
    }
}
