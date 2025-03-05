import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../config/constants';

export interface Store {
    storeId: string;
    name: string;
    region: string;
    address: string;
    active: boolean;
    phoneNumber: string;
    email: string;
    storeType: String;
    deliveryFee: number;
    rating: number;
}

export interface LocationRequest {
    latitude: number;
    longitude: number;
}

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