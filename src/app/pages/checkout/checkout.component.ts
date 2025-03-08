import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../../services/BasketService';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/Product';

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
    name: '',
    email: '',
    address: '',
    cardNumber: ''
  };

  constructor(private basketService: BasketService, private router: Router) { }

  placeOrder() {
    if (!this.customerInfo.name || !this.customerInfo.email || !this.customerInfo.address || !this.customerInfo.cardNumber) {
      alert('Please fill in all required fields.');
      return;
    }

    alert('Order placed successfully!');
    this.basketService.clearBasket();
    this.router.navigate(['/']);
  }
}
