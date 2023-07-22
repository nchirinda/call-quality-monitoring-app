import {HttpClient, HttpResponse} from '@angular/common/http';
import {Customer} from '../models/Customer';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

export class CustomersClient {

    private httpObserveOption = {observe: 'response' as const};
    private readonly baseURL = environment.baseUrl;
    private readonly customersUrl = this.baseURL + '/customers';

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP POST /customers
     * Service method: CustomersController.create
     */
    createCustomer(newCustomer: Customer): Observable<HttpResponse<void>> {
        return this.httpClient.post<void>(`${this.customersUrl}`, newCustomer, this.httpObserveOption);
    }

    /**
     * HTTP GET /customers
     * Service method: CustomersController.getAll
     */
    getCustomers(): Observable<HttpResponse<Customer[]>> {
        return this.httpClient.get<Customer[]>(this.customersUrl, this.httpObserveOption);
    }

    /**
     * HTTP GET /customers/count
     * Service method: CustomersController.count
     */
    countCustomers(): Observable<HttpResponse<number>> {
        return this.httpClient.get<number>(`${this.customersUrl}/count`, this.httpObserveOption);
    }

    /**
     * HTTP GET /customers/{id}
     * Service method: CustomersController.get
     */
    getCustomer(id: string): Observable<HttpResponse<Customer>> {
        return this.httpClient.get<Customer>(`${this.customersUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP DELETE /customers/{id}
     * Service method: CustomersController.remove
     */
    removeCustomer(id: string): Observable<HttpResponse<void>> {
        return this.httpClient.delete<void>(`${this.customersUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP PUT /customers/{id}
     * Service method: CustomersController.update
     */
    updateCustomer(customer: Customer): Observable<HttpResponse<void>> {
        return this.httpClient.put<void>(this.customersUrl, customer, this.httpObserveOption);
    }
}
