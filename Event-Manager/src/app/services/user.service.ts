import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: any = null; // Variable to store user details
  private token: string | null = null; // Variable to store token
  public isLoggedIn$ = new BehaviorSubject<boolean>(false); // Observable for login state

  constructor() {
    // Initialize the user and token from localStorage when the service is created
    this.token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    this.currentUser = userString ? JSON.parse(userString) : null;
    this.isLoggedIn$.next(!!this.token)
  }

  // Retrieve the logged-in user
  getCurrentUser() {
    return this.currentUser;
  }

  // Retrieve a specific user property (e.g., username)
  getUsername(): string {
    return this.currentUser ? this.currentUser.name : 'Guest'; // Default to 'Guest' if no user is logged in
  }

  // Retrieve the token
  getToken(): string | null {
    return this.token;
  }

  // Check if a user is logged in
  isLoggedIn(): boolean {
    return !!this.token; // Returns true if token exists
  }

  // Save user and token details
  setLoginDetails(user: any, token: string): void {
    this.currentUser = user;
    this.token = token;

    // Persist to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.isLoggedIn$.next(true);
    console.log("Current User: ", this.currentUser);
  }

  

  // Log out the user
  logout(): void {
    this.currentUser = null;
    this.token = null;

    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn$.next(false);
    console.log("Current User: ", this.currentUser);
  }
}