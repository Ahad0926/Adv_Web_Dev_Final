import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


export class EventService {
  private baseUrl: string = 'http://127.0.0.1:5000/api/events';

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getEventById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createEvent(eventData: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.post(`${this.baseUrl}`, eventData, { headers });
  }
}