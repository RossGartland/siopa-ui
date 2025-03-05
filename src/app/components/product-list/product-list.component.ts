import { Component, Input, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/ProductService';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnChanges {
  @Input() storeId!: string;
  products = signal<Product[]>([]);

  constructor(private productService: ProductService) { }

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
}