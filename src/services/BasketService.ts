import { Injectable, signal, inject } from '@angular/core';
import { Product } from '../models/Product';
import { Router, NavigationStart, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketItems = signal<Product[]>([]);
  private router = inject(Router);

  get items() {
    return this.basketItems.asReadonly();
  }


  constructor() {
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event: RouterEvent) => {
      if (this.basketItems().length > 0) {
        const confirmLeave = window.confirm('Your basket will be reset if you leave this page. Do you want to continue?');
        if (!confirmLeave) {
          history.pushState(null, '', location.href);
          return;
        }
        this.clearBasket();
      }
    });

    window.addEventListener('beforeunload', (event) => {
      if (this.basketItems().length > 0) {
        event.preventDefault();
      }
    });
  }

  addToBasket(product: Product) {
    this.basketItems.set([...this.basketItems(), product]);
  }

  removeFromBasket(index: number) {
    const updatedBasket = [...this.basketItems()];
    updatedBasket.splice(index, 1);
    this.basketItems.set(updatedBasket);
  }

  clearBasket() {
    this.basketItems.set([]);
  }
}