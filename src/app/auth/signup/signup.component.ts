import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/AuthService';
import { User } from '../../../models/User'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = {
    username: '',
    forename: '',
    surname: '',
    email: '',
    password: '',
    role: ['ROLE_USER'] // Auto-assigned role
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.signUp(this.user).subscribe({
      next: () => {
        alert('Sign up successful! You can now log in.');
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (error) => {
        console.error('Signup error:', error);
        this.errorMessage = 'Signup failed. Please try again.';
      }
    });
  }
}
