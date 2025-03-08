import { Component, Input, signal, computed, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/ProductService';
import { Product } from '../../../models/Product';
import { AuthService } from '../../../services/AuthService';
import { BasketService } from '../../../services/BasketService';
import { BasketComponent } from '../basket/basket.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, BasketComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnChanges {
  @Input() storeId!: string;
  products = signal<Product[]>([]);

  isLoggedIn = computed(() => this.authService.isLoggedIn());

  showLoginMessage = signal<boolean>(false);

  constructor(private productService: ProductService,
    private authService: AuthService, private basketService: BasketService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['storeId'] && this.storeId) {
      this.loadProducts();
    }
  }

  loadProducts() {
    if (!this.storeId) return;

    this.productService.getProductsByStoreId(this.storeId).subscribe({
      next: (data) => this.products.set(data),
      error: () => console.error('Failed to load products'),
    });
  }

  addToBasket(product: Product) {
    this.basketService.addToBasket(product);
  }

  handleAddToCartClick() {
    if (!this.isLoggedIn()) {
      this.showLoginMessage.set(true);
      setTimeout(() => this.showLoginMessage.set(false), 3000);
    }
  }
}
