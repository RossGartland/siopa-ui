import { OrderItem } from './OrderItem';

export interface Order {
    customerID: string;
    customerEmail: string;
    forename: string;
    surname: string;
    phoneNumber: string;
    billingAddress: string;
    storeID: string;
    totalItemCost: number;
    isDelivery: boolean;
    isCollection: boolean;
    deliveryFee: number;
    deliveryAddress: string;
    totalCost: number;
    status: 'SUBMITTED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
    customerLat: number;
    customerLng: number;
    orderItems: OrderItem[];
}
