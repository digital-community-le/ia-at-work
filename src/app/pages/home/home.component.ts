import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeatureToggleService } from '../../services/feature-toggle.service';
import { NgOptimizedImage } from '@angular/common';
import { SPONSORS } from '../../constants/sponsors';
import { EventbriteService as TicketService } from '../../services/eventbrite.service';
import { environment } from '../../../environments/environment';
import { TesseramentoReminderDirective } from '../../directives/tesseramento-reminder.directive';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterModule, NgOptimizedImage, MatTooltipModule, TesseramentoReminderDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly ticketService = inject(TicketService);
  protected readonly featureToggleService = inject(FeatureToggleService);

  protected readonly sponsors = [...SPONSORS].sort((a, b) => a.name.localeCompare(b.name));

  protected readonly ticketUrl = this.ticketService.getEventUrl(environment.eventbriteEventId);

  goToTicketPage() {
    const url = this.ticketService.getEventUrl(environment.eventbriteEventId);
    window.location.href = url;
  }
}
