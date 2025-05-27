import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { FeatureToggleService } from '../../services/feature-toggle.service';

@Component({
  standalone: true,
  selector: 'app-navigation',
  imports: [MatListModule, RouterModule],
  styleUrl: './navigation.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-nav-list>
      <!-- <a mat-list-item routerLink="/" routerLinkActive="">Evento</a> -->

      @if (featureToggleService.isFeatureEnabled('callForSpeaker')) {
        <a mat-list-item routerLink="/call-for-speaker" routerLinkActive
          >Call for speaker</a
        >
      }

      @if (featureToggleService.isFeatureEnabled('callForSponsor')) {
        <a mat-list-item routerLink="/call-for-sponsor" routerLinkActive
          >Call for sponsor</a
        >
      }

      <a
        mat-list-item
        [routerLink]="['.']"
        fragment="contatti"
        routerLinkActive=""
        >Contatti</a
      >
    </mat-nav-list>
  `,
})
export class NavigationComponent {
  protected readonly featureToggleService = inject(FeatureToggleService);
}
