import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../../services/StoreService';
import { Store } from '../../../models/Store';
import { ProductListComponent } from '../product-list/product-list.component';
import { BasketService } from '../../../services/BasketService';

@Component({
  selector: 'app-store-details',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent {
  storeId: string = '';
  store: Store | null = null;

  constructor(private route: ActivatedRoute,
    private storeService: StoreService, private basketService: BasketService) {
    this.storeId = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.storeId) {
      this.basketService.setStoreId(this.storeId);
      this.storeService.getStoreById(this.storeId).subscribe({
        next: (data) => this.store = data,
        error: () => console.error('Failed to fetch store details'),
      });
    }
  }
}
