import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/StoreService';
import { LocationRequest } from '../../../models/LocationRequest';
import { Store } from '../../../models/Store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-nearby-stores',
  templateUrl: './nearby-stores.component.html',
  styleUrls: ['./nearby-stores.component.css'],
  imports: [CommonModule, RouterModule]
})
export class NearbyStoresComponent implements OnInit {
  stores: Store[] = [];
  userLocation: LocationRequest = { latitude: 0, longitude: 0 };
  loading: boolean = false;
  error: string | null = null;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation.latitude = position.coords.latitude;
          this.userLocation.longitude = position.coords.longitude;
          this.getNearbyStores();
        },
        (error) => {
          this.error = 'Location access denied. Please allow location access.';
        }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
    }
  }

  getNearbyStores(): void {
    this.loading = true;
    this.storeService.getNearbyStores(this.userLocation).subscribe({
      next: (data) => {
        this.stores = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No stores found nearby.';
        this.loading = false;
      }
    });
  }
}
