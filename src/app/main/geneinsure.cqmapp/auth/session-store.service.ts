import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionStoreService {

    // Private Fields
    private readonly ACCESS_TOKEN_KEY = 'access_token';

    constructor() {
    }

    storeToken(accessToken: string): void {
        sessionStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    }

    getAccessToken(): string {
        return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    removeTokens(): void {
        sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    }
}
