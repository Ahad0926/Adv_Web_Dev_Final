import { HttpClient, HttpClientModule } from '@angular/common/http';


export class EventService {
  private baseUrl: string = 'http://127.0.0.1:5000/api/events';

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getEventById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}