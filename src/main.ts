import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', loadComponent: () => import('./app/pages/home/home.component').then(m => m.HomeComponent) },
      { path: 'login', loadComponent: () => import('./app/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'signup', loadComponent: () => import('./app/auth/signup/signup.component').then(m => m.SignupComponent) }
    ]),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
