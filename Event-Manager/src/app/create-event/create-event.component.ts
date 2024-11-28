import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  event = {
    title: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    location: '',
    ticket_price: '',
    total_tickets: 0,
    description: '',
  };

  timeOptions: string[] = [];
  filteredEndTimeOptions: string[] = [];
  private eventService: EventService;

  constructor(private http: HttpClient, private router: Router) {
    this.eventService = new EventService(http);
    this.initializeTimeOptions();
  }

  initializeTimeOptions() {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        times.push(time);
      }
    }
    this.timeOptions = times;
    this.filteredEndTimeOptions = [...this.timeOptions];
  }

  updateEndTimeOptions() {
    const startIndex = this.timeOptions.indexOf(this.event.start_time);
    this.filteredEndTimeOptions = this.timeOptions.slice(startIndex + 1);
  }

  onSubmit() {
    if (
      this.event.start_date === this.event.end_date &&
      this.event.start_time >= this.event.end_time
    ) {
      alert('End time must be after the start time.');
      return;
    }
    
    const eventPayload = {
      title: this.event.title,
      description: this.event.description,
      start_date: `${this.event.start_date}T${this.event.start_time}:00`,
      end_date: `${this.event.end_date}T${this.event.end_time}:00`,
      location: this.event.location,
      ticket_price: this.event.ticket_price,
      total_tickets: this.event.total_tickets,
    };

    this.eventService.createEvent(eventPayload).subscribe({
      next: (response) => {
        console.log('Event created successfully:', response);
        this.router.navigate(['/events-list']);
      },
      error: (err) => {
        console.error('Error creating event:', err);
        alert('Error creating event. Please try again.');
      },
    });
  }
}
