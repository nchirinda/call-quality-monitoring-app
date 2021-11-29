import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {UsersClient} from '../service/clients/UsersClient';
import {environment} from '../../../../environments/environment';
import {User} from '../service/models/User';
import {SessionStoreService} from './session-store.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public redirectUrl: string;

    // ------------------------------[ PRIVATE FIELDS ]-----------------------------------
    private _userProfileSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    // ------------------------------[ PUBLIC PROPERTIES ]--------------------------------
    public userProfile: Observable<User> = this._userProfileSubject.asObservable();

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private usersClient: UsersClient,
        private sessionStore: SessionStoreService,
    ) {
    }

    authenticateUser(email: string, password: string): Observable<User> {

        return this.usersClient.loginUser(email, password)
            .pipe(
                map((resp) => resp.body),
                tap((value) => {
                    this._userProfileSubject.next(value);
                    this.sessionStore.storeToken(value.id);
                })
            );
    }

    loadUserProfile(): Observable<User> {

        this.usersClient.getUser(this.sessionStore.getAccessToken())
            .pipe(
                map((resp) => resp.body),
            )
            .subscribe(
                (res) => {
                    this._userProfileSubject.next(res);
                },
                (err) => {
                    this.router.navigate(['/auth/login']).then();
                }
            );

        return this._userProfileSubject.asObservable();
    }

    logout(): any {
        this._userProfileSubject = new BehaviorSubject<any>(null);
        this.sessionStore.removeTokens();
    }
}
