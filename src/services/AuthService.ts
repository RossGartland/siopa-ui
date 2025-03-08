import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { APP_CONSTANTS } from '../config/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = APP_CONSTANTS.API_BASE_URL + APP_CONSTANTS.SERVICES.SIOPA_AUTH;

    isLoggedIn = signal<boolean>(this.getToken() !== null);

    constructor(private http: HttpClient) { }

    signUp(user: User): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/api/auth/signup`, user);
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/api/auth/signin`, { username, password });
    }

    logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('email');
        }
        this.isLoggedIn.set(false);
    }

    getToken(): string | null {
        if (typeof window === 'undefined') {
            return null;
        }
        return localStorage.getItem('accessToken');
    }

    getUserDetails(): { email: string | null; userId: string | null } {
        if (typeof window === 'undefined') {
            return { email: null, userId: null };
        }

        return {
            email: localStorage.getItem('email'),
            userId: localStorage.getItem('userId')
        };
    }
}
