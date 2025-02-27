import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { APP_CONSTANTS } from '../config/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = APP_CONSTANTS.API_BASE_URL + APP_CONSTANTS.SERVICES.SIOPA_AUTH;

    constructor(private http: HttpClient) { }

    signUp(user: User): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/api/auth/signup`, user);
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/api/auth/signin`, { username, password });
    }
}