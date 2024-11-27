import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
@Injectable({
  providedIn: 'root',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  payload: any;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  onSubmit(): void {
    this.payload = { email: this.email, password: this.password };
    this.login(this.payload);
  }

  login(loginDetails: any): void{
    this.http.post('http://127.0.0.1:5000/api/auth/login', loginDetails).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        // Store the token in localStorage
        localStorage.setItem('token', response.token);

        // Optionally store user details or role
        localStorage.setItem('user', JSON.stringify(response.user));
        this.userService.setLoginDetails(response.user, response.token);


        console.log('Login successful');
        this.router.navigate(['/']); // Redirect to the homepage
      },
      error: (err) => {
        console.error(err);
        alert('Login failed. Please check your credentials.');
      },
    });
  }
}
