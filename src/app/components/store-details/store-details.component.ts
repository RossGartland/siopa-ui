import { CommonModule, } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService, Store } from '../../../services/StoreService';
import { Observable } from 'rxjs';
import { ProductListComponent } from '../product-list/product-list.component';

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

  constructor(private route: ActivatedRoute, private storeService: StoreService) {
    this.storeId = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.storeId) {
      this.storeService.getStoreById(this.storeId).subscribe({
        next: (data) => this.store = data,
        error: (err) => console.error('Failed to fetch store details', err),
      });
    }
  }
}