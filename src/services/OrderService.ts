import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from '../config/constants';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = APP_CONSTANTS.API_BASE_URL + APP_CONSTANTS.SERVICES.SIOPA_ORDERS;

    constructor(private http: HttpClient) { }

    submitOrder(order: Order): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/api/orders`, order);
    }
}