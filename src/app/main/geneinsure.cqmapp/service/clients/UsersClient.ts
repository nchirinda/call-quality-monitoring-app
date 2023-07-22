import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../models/User';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

export class UsersClient {

    private httpObserveOption = {observe: 'response' as const};
    private readonly baseURL = environment.baseUrl;
    private readonly usersUrl = this.baseURL + '/users';

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP POST /users
     * Service method: UsersController.create
     */
    createUser(newUser: User): Observable<HttpResponse<void>> {
        return this.httpClient.post<void>(`${this.usersUrl}/enroll`, newUser, this.httpObserveOption);
    }

    /**
     * HTTP GET /users
     * Service method: UsersController.getAll
     */
    getUsers(): Observable<HttpResponse<User[]>> {
        return this.httpClient.get<User[]>(this.usersUrl, this.httpObserveOption);
    }

    /**
     * HTTP GET /users/count
     * Service method: UsersController.count
     */
    countUsers(): Observable<HttpResponse<number>> {
        return this.httpClient.get<number>(`${this.usersUrl}/count`, this.httpObserveOption);
    }

    /**
     * HTTP GET /users/{id}
     * Service method: UsersController.get
     */
    getUser(id: string): Observable<HttpResponse<User>> {
        return this.httpClient.get<User>(`${this.usersUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP POST /users/login
     * Service method: UsersController.get
     */
    loginUser(email: string, password: string): Observable<HttpResponse<User>> {
        return this.httpClient.post<User>(this.baseURL + '/users/login', {username: email, password: password}, this.httpObserveOption);
    }

    /**
     * HTTP DELETE /users/{id}
     * Service method: UsersController.remove
     */
    removeUser(id: string): Observable<HttpResponse<void>> {
        return this.httpClient.delete<void>(`${this.usersUrl}/${id}`, this.httpObserveOption);
    }

    /**
     * HTTP PUT /users/{id}
     * Service method: UsersController.update
     */
    updateUser(user: User): Observable<HttpResponse<void>> {
        return this.httpClient.put<void>(this.usersUrl, user, this.httpObserveOption);
    }
}
