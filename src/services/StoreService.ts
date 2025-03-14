import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../config/constants';
import { Store } from '../models/Store';
import { LocationRequest } from '../models/LocationRequest';


@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private apiUrl = APP_CONSTANTS.API_BASE_URL + APP_CONSTANTS.SERVICES.SIOPA_STORES;

    constructor(private http: HttpClient) { }

    // Get all stores
    getAllStores(): Observable<Store[]> {
        return this.http.get<Store[]>(`${this.apiUrl}/api/stores`);
    }

    // Get nearby stores
    getNearbyStores(location: LocationRequest): Observable<Store[]> {
        return this.http.post<Store[]>(`${this.apiUrl}/api/stores/nearby`, location);
    }

    // Get store by ID
    getStoreById(id: string): Observable<Store> {
        return this.http.get<Store>(`${this.apiUrl}/api/stores/${id}`);
    }

    // Create a new store
    createStore(store: Store): Observable<Store> {
        return this.http.post<Store>(`${this.apiUrl}/api/stores`, store);
    }
}