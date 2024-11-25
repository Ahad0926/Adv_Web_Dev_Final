import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  event: any;

  // Mock event data (replace this with a backend API call)
  mockEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: 'Nov 30, 2024',
      location: 'Oshawa, ON',
      description: 'Join industry leaders for a day of tech talks and networking.',
      organizer: 'John Doe',
      ticketPrice: 100,
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      title: 'Music Festival',
      date: 'Dec 1, 2024',
      location: 'Toronto, ON',
      description: 'Experience live music from top artists in a vibrant outdoor setting.',
      organizer: 'Jane Smith',
      ticketPrice: 75,
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the event ID from the route
    const eventId = +this.route.snapshot.paramMap.get('id')!;
    // Fetch event data based on the ID
    this.event = this.mockEvents.find((e) => e.id === eventId);
  }
}