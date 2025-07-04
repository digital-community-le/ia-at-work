import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { FeatureToggleService } from '../../services/feature-toggle.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { TesseramentoReminderDirective } from '../../directives/tesseramento-reminder.directive';
import { EventbriteService } from '../../services/eventbrite.service';
import { environment } from '../../../environments/environment.dev';

@Component({
  standalone: true,
  selector: 'app-navigation',
  imports: [MatListModule, RouterModule, MatDividerModule, MatButtonModule, TesseramentoReminderDirective],
  styleUrl: './navigation.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'navigation',
    '[class.horizontal]': 'horizontal()',
  },
  template: `
    <mat-nav-list class="nav-list">
      @if (featureToggleService.isFeatureEnabled('callForSpeaker')) {
        <a
          mat-list-item
          routerLink="/call-for-speaker"
          routerLinkActive="active-link"
          >Call for speaker</a
        >
      }

      @if (featureToggleService.isFeatureEnabled('callForSponsor')) {
        <a
          mat-list-item
          routerLink="/call-for-sponsor"
          routerLinkActive="active-link"
          >Call for sponsor</a
        >
      }

      <a
        mat-list-item
        routerLink="/privacy-policy"
        routerLinkActive="active-link"
        >Privacy Policy</a
      >

      <a
        mat-list-item
        [routerLink]="['.']"
        fragment="contatti"
        routerLinkActive="active-link"
        >Contatti</a
      >
    </mat-nav-list>

    @if (featureToggleService.isFeatureEnabled('eventTickets')) {
      <mat-divider [vertical]="horizontal()"></mat-divider>

      <button mat-flat-button class="cta-btn" appTesseramentoReminder (tesseramentoCompleted)="goToTicketPage()">
        Prenota il tuo posto
      </button>
    }
  `,
})
export class NavigationComponent {
  protected readonly featureToggleService = inject(FeatureToggleService);
  private readonly ticketService = inject(EventbriteService);

  readonly horizontal = input<boolean, unknown>(false, {
    transform: coerceBooleanProperty,
  });

  goToTicketPage() {
    const url = this.ticketService.getEventUrl(environment.eventbriteEventId);
    window.location.href = url;
  }
}
