import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any = null;
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get('/api/auth/me').subscribe({
      next: (data) => {
        console.log('User details fetched:', data);
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      },
    });
  }
  

}
