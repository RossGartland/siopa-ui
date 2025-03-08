import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { BasketService } from '../../../services/BasketService';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  basketItems = computed(() => this.basketService.items());
  showWarning = computed(() => this.basketItems().length > 0);

  constructor(private basketService: BasketService) { }

  removeFromBasket(index: number) {
    this.basketService.removeFromBasket(index);
  }

  checkout() {
    alert('Proceeding to checkout...');
    this.basketService.clearBasket();
  }
}