import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventService } from '../services/event.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events: any[] = [];
  imageLoaded = false;
  private eventService: EventService;

  constructor(private http: HttpClient) {
    this.eventService = new EventService(http);
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        console.log('Events fetched successfully:', data);
        this.events = data;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }
}
