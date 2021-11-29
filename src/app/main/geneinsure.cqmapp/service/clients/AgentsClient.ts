import {HttpClient, HttpResponse} from '@angular/common/http';
import {Agent} from '../models/Agent';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

export class AgentsClient {

    private httpObserveOption = {observe: 'response' as const};
    private readonly baseURL = environment.baseUrl;
    private readonly agentsUrl = this.baseURL + '/agents';

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP POST /agents
     * Service method: AgentsController.create
     */
    createAgent(newAgent: Agent): Observable<HttpResponse<void>> {
        return this.httpClient.post<void>(`${this.agentsUrl}`, newAgent, this.httpObserveOption);
    }

    /**
     * HTTP GET /agents
     * Service method: AgentsController.getAll
     */
    getAgents(): Observable<HttpResponse<Agent[]>> {
        return this.httpClient.get<Agent[]>(this.agentsUrl, this.httpObserveOption);
    }

    /**
     * HTTP GET /agents/count
     * Service method: AgentsController.count
     */
    countAgents(): Observable<HttpResponse<number>> {
        return this.httpClient.get<number>(`${this.agentsUrl}/count`, this.httpObserveOption);
    }

    /**
     * HTTP GET /agents/{id}
     * Service method: AgentsController.get
     */
    getAgent(id: string): Observable<HttpResponse<Agent>> {
        return this.httpClient.get<Agent>(`${this.agentsUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP DELETE /agents/{id}
     * Service method: AgentsController.remove
     */
    removeAgent(id: string): Observable<HttpResponse<void>> {
        return this.httpClient.delete<void>(`${this.agentsUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP PUT /agents/{id}
     * Service method: AgentsController.update
     */
    updateAgent(agent: Agent): Observable<HttpResponse<void>> {
        return this.httpClient.put<void>(this.agentsUrl, agent, this.httpObserveOption);
    }
}
