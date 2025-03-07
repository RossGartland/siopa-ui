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