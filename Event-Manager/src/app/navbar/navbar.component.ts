import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }
}