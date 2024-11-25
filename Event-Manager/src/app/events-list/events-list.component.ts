import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent {
  events = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: 'Nov 30, 2024',
      location: 'Oshawa, ON',
      description: 'Join industry leaders for a day of tech talks and networking.',
      image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs later
    },
    {
      id: 2,
      title: 'Music Festival',
      date: 'Dec 1, 2024',
      location: 'Toronto, ON',
      description: 'Experience live music from top artists in a vibrant outdoor setting.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      title: 'Art Workshop',
      date: 'Dec 2, 2024',
      location: 'Oshawa, ON',
      description: 'A hands-on workshop for art enthusiasts of all skill levels.',
      image: 'https://via.placeholder.com/300x200',
    },
  ];
}
