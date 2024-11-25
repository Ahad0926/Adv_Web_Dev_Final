import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupData = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://127.0.0.1:5000/api/auth/signup', this.signupData)
      .subscribe(
        (response: any) => {
          console.log('Signup successful!', this.signupData);
          this.router.navigate(['/login']); // Redirect to login after successful signup
        },
        (error) => {
          alert('Error during signup. Please try again.');
          console.error(error);
        }
      );
  }
}