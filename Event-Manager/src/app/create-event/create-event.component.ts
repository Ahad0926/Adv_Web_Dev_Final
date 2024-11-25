import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  event = {
    //id organizer_id, and created_at
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

  constructor(private router: Router) {
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
    // Ensure the end time options start from the selected start time
    const startIndex = this.timeOptions.indexOf(this.event.start_time);
    this.filteredEndTimeOptions = this.timeOptions.slice(startIndex + 1);
  }

  onSubmit() {
    // Validate the end time is after the start time
    if (
      this.event.start_date === this.event.end_date &&
      this.event.start_time >= this.event.end_time
    ) {
      alert('End time must be after the start time.');
      return;
    }

    console.log('Event data:', this.event);
    // Placeholder: Send the event data to the backend API
    this.router.navigate(['/events-list']);
  }
}
