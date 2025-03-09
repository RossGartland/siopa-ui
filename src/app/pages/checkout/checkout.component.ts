import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../../services/BasketService';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Order } from '../../../models/Order';
import { OrderService } from '../../../services/OrderService';
import { AuthService } from '../../../services/AuthService';
import { OrderItem } from '../../../models/OrderItem';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  storeId: string;
  basketItems = computed(() => this.basketService.items());
  totalAmount = computed(() => this.basketService.items().reduce((sum, item) => sum + item.price, 0));

  customerInfo = {
    forename: '',
    surname: '',
    phoneNumber: '',
    email: '',
    isDelivery: false,
    deliveryAddress: '',
    billingAddress: '',
    cardNumber: ''
  };

  constructor(
    private basketService: BasketService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.storeId = this.basketService.getStoreId() ?? '';
  }

  placeOrder(): void {
    const userDetails = this.authService.getUserDetails();
    const customerID = userDetails.userId;
    const customerEmail = userDetails.email;

    if (
      !this.customerInfo.forename ||
      !this.customerInfo.surname ||
      !this.customerInfo.phoneNumber ||
      !customerEmail ||
      !customerID ||
      (this.customerInfo.isDelivery && !this.customerInfo.deliveryAddress) ||
      !this.customerInfo.billingAddress ||
      !this.customerInfo.cardNumber
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const orderItems: OrderItem[] = this.basketItems().map((product: Product) => ({
      productId: product.productId, // Ensure Product has an "id" field
      productName: product.name, // Ensure Product has a "name" field
      quantity: 1, // Default quantity, modify if needed
      price: product.price
    }));

    const order: Order = {
      customerID: customerID,
      customerEmail: customerEmail,
      forename: this.customerInfo.forename,
      surname: this.customerInfo.surname,
      phoneNumber: this.customerInfo.phoneNumber,
      storeID: this.storeId,
      totalItemCost: this.totalAmount(),
      isDelivery: this.customerInfo.isDelivery,
      isCollection: !this.customerInfo.isDelivery,
      deliveryFee: this.customerInfo.isDelivery ? 5.0 : 0.0,
      deliveryAddress: this.customerInfo.deliveryAddress,
      billingAddress: this.customerInfo.billingAddress,
      totalCost: this.totalAmount() + (this.customerInfo.isDelivery ? 5.0 : 0.0),
      status: 'SUBMITTED',
      customerLat: 0,
      customerLng: 0,
      orderItems: orderItems
    };

    this.orderService.submitOrder(order).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.basketService.clearBasket();
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Order submission failed. Please try again.');
      }
    });
  }
}