import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class EventbriteService {
  private readonly apiUrl = environment.eventbriteApiUrl; // URL base per l'API di Eventbrite
  private readonly token = environment.eventbriteToken; // Token API di Eventbrite

  constructor(private http: HttpClient) { }

  getEventDetails(eventId: string): Observable<any> {
    const url = `${this.apiUrl}/events/${eventId}/`; // Endpoint per ottenere i dettagli di un evento
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  getEventUrl(eventId: string): string {
    const eventUrl = environment.eventbriteEventUrl; // URL base per visualizzare l'evento su Eventbrite
    return `${eventUrl}/${eventId}`; // URL per visualizzare l'evento su Eventbrite
  }
}
