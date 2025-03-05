import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../config/constants';

export interface Product {
    productId: string;
    storeId: string;
    name: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
    attributes: { [key: string]: any };
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = APP_CONSTANTS.API_BASE_URL + APP_CONSTANTS.SERVICES.SIOPA_PRODUCTS;

    constructor(private http: HttpClient) { }

    getProductsByStoreId(storeId: string): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/api/products/store/${storeId}`);
    }

    getProductById(productId: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/api/products/${productId}`);
    }
}
