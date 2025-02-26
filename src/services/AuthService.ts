import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://your-api.com'; //Change this.

    constructor(private http: HttpClient) { }

    signUp(user: User): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/signup`, user);
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
    }
}