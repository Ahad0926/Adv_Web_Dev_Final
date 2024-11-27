import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: any;
  eventService: EventService;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    // Create the EventService instance manually
    this.eventService = new EventService(http);
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe({
        next: (data) => {
          console.log('Event details fetched:', data);
          this.event = data;
        },
        error: (err) => {
          console.error('Error fetching event details:', err);
        },
      });
    }
  }
}
