import { CommonModule } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { BasketService } from '../../../services/BasketService';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  @Input() storeId!: string;
  basketItems = computed(() => this.basketService.items());
  showWarning = computed(() => this.basketItems().length > 0);

  constructor(private basketService: BasketService) { }

  removeFromBasket(index: number) {
    this.basketService.removeFromBasket(index);
  }
}