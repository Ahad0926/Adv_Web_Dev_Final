import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const payload = { email: this.email, password: this.password };

    this.http.post('http://127.0.0.1:5000/api/auth/login', payload).subscribe({
      next: (response: any) => {
        // Store the token in localStorage or sessionStorage
        localStorage.setItem('token', response.token);

        // Optionally store user details or role
        localStorage.setItem('user', JSON.stringify(response.user));

        console.log('Login successful');
        this.router.navigate(['/']); // Redirect to the homepage or dashboard
      },
      error: (err) => {
        console.error(err);
        alert('Login failed. Please check your credentials.');
      },
    });
  }
}
