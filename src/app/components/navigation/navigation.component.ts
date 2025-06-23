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

@Component({
  standalone: true,
  selector: 'app-navigation',
  imports: [MatListModule, RouterModule, MatDividerModule, MatButtonModule],
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

      <a mat-flat-button class="cta-btn" href="https://www.eventbrite.com/e/1381562553789">
        Prenota il tuo posto</a
      >
    }
  `,
})
export class NavigationComponent {
  protected readonly featureToggleService = inject(FeatureToggleService);

  readonly horizontal = input<boolean, unknown>(false, {
    transform: coerceBooleanProperty,
  });
}
