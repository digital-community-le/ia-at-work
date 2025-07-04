import { inject, Injectable } from '@angular/core';
import { EventbriteService } from './eventbrite.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  private readonly eventbriteService = inject(EventbriteService);

  /**
   * Controlla la disponibilità dei biglietti per un evento specifico.
   * @param eventId L'ID dell'evento da controllare.
   * @returns Un Observable che emette lo stato dei biglietti e l'URL dell'evento.
   */
  checkTicketAvailability(eventId: string): Observable<{ status: string; url: string }> {
    return this.eventbriteService.getEventDetails(eventId).pipe(
      map(response => {
        const isSoldOut = response.ticket_availability?.is_sold_out;
        return {
          status: isSoldOut ? 'sold_out' : 'available',
          url: response.url
        };
      })
    );
  }

  getEventUrl(eventId: string): string {
    return this.eventbriteService.getEventUrl(eventId);
  }
}
