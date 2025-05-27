import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
  HostListener,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { output } from '@angular/core';
import { APP_CONFIG } from '../../app.config.token';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    AsyncPipe,
    RouterModule,
  ],
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-toolbar
      [class.transparent]="!isScrolled"
      [class.scrolled]="isScrolled"
    >
      <a class="logo" routerLink="/" mat-button>
        <div class="glitch-wrapper">
          <div class="glitch" data-glitch="IA al lavoro">IA al lavoro</div>
        </div>
      </a>
      <span class="spacer"></span>

      <!-- Desktop-only menu items -->
      <ng-container *ngIf="!(isMobile$ | async)">
        <button
          *ngIf="config.features.callForSpeaker"
          routerLink="/call-for-speaker"
          routerLinkActive
          mat-button
        >
          Call for Speaker
        </button>

        <button
          *ngIf="config.features.callForSponsor"
          routerLink="/call-for-sponsor"
          routerLinkActive
          mat-button
        >
          Call for Sponsor
        </button>

        <a
          mat-button
          [routerLink]="['.']"
          fragment="contatti"
          routerLinkActive="active-link"
          >Contatti</a
        >
      </ng-container>

      <!-- Mobile-only hamburger -->
      <button
        type="button"
        *ngIf="isMobile$ | async"
        mat-icon-button
        aria-label="Toggle menu"
        (click)="onToggleMenu()"
      >
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
  `,
})
export class HeaderComponent {
  readonly toggleMenu = output<void>();
  readonly config = inject(APP_CONFIG);
  readonly isMobile$ = inject(BreakpointObserver)
    .observe([Breakpoints.Handset])
    .pipe(map((result) => result.matches));

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollY > 10;
  }

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
