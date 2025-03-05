import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService, Store } from '../../../services/StoreService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-store-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-details.component.html',
  styleUrl: './store-details.component.css'
})
export class StoreDetailsComponent {
  storeId: string | null = null;
  store$: Observable<Store> | null = null;

  constructor(private route: ActivatedRoute, private storeService: StoreService) {
    this.storeId = this.route.snapshot.paramMap.get('id');
    if (this.storeId) {
      this.store$ = this.storeService.getStoreById(this.storeId);
    }
  }
}
