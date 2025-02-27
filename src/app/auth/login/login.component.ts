import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        alert('Login successful!');
        localStorage.setItem('token', response.token); // Save token (if API returns it)
        this.router.navigate(['/dashboard']); // Redirect after login
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
