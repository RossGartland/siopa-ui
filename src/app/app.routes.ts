import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { path: 'about', loadComponent: () => import('./pages/about-us/about-us.component').then(m => m.AboutUsComponent) },
    { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'signup', loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent) },
    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'nearby-stores', loadComponent: () => import('./components/nearby-stores/nearby-stores.component').then(m => m.NearbyStoresComponent) },
    { path: 'store/:id', loadComponent: () => import('./components/store-details/store-details.component').then(m => m.StoreDetailsComponent) },
    { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent) }
];
