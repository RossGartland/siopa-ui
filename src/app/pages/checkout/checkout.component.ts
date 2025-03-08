import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../../services/BasketService';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  basketItems = computed(() => this.basketService.items());
  totalAmount = computed(() => this.basketItems().reduce((sum, item) => sum + item.price, 0));

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

  constructor(private basketService: BasketService, private router: Router) { }

  placeOrder(): void {
    if (
      !this.customerInfo.forename ||
      !this.customerInfo.surname ||
      !this.customerInfo.phoneNumber ||
      !this.customerInfo.email ||
      (!this.customerInfo.isDelivery && !this.customerInfo.deliveryAddress) ||
      !this.customerInfo.deliveryAddress ||
      !this.customerInfo.billingAddress ||
      !this.customerInfo.cardNumber
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    alert('Order placed successfully!');
    this.basketService.clearBasket();
    this.router.navigate(['/']);
  }
}
