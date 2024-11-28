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

          // Format the event date and reassign it
          this.event = {
            ...data,
            formattedDate: this.formatEventDate(data.start_date, data.end_date),
          };
        },
        error: (err) => {
          console.error('Error fetching event details:', err);
        },
      });
    }
  }

  formatEventDate(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Format date: Month day · StartTime - EndTime
    const options = { month: 'long', day: 'numeric' } as const;
    const startDateStr = start.toLocaleDateString(undefined, options);
    const startTimeStr = start.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
    });
    const endTimeStr = end.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
    });

    return `${startDateStr} · ${startTimeStr} - ${endTimeStr}`;
  }
}