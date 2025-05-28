import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
  signal,
  computed,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { APP_CONFIG } from '../../app.config.token';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    NavigationComponent
  ],
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
  template: `
    <mat-toolbar
      [class.transparent]="!isScrolled()"
      [class.scrolled]="isScrolled() || isMobile() && isMenuOpened()"
    >
      <a class="logo" routerLink="/" mat-button>
        <div class="glitch-wrapper">
          <div class="glitch" data-glitch="IA al lavoro">IA al lavoro</div>
        </div>
      </a>
      <span class="spacer"></span>

      <!-- Desktop-only menu items -->
      @if(!isMobile()) {
        <app-navigation
          class="menu-panel"
          horizontal
        ></app-navigation>
      }

      <!-- Mobile-only hamburger -->
      @if(isMobile()) {
        <button
          type="button"
          mat-icon-button
          aria-label="Toggle menu"
          (click)="toggleMenu()"
        >
          <mat-icon>{{ mobileMenuTogglerIcon() }}</mat-icon>
        </button>
      }
    </mat-toolbar>

    <!-- Custom mobile menu -->
    @if(isMobile() && isMenuOpened()) {
      <div class="mobile-menu" >
        <app-navigation class="menu-panel" (click)="closeMenu()"></app-navigation>
        <div class="menu-overlay" (click)="closeMenu()"></div>
      </div>
    }
  `,
})
export class HeaderComponent {
  readonly config = inject(APP_CONFIG);
  readonly isMobile$ = inject(BreakpointObserver)
    .observe([Breakpoints.Handset])
    .pipe(map((result) => result.matches));

  readonly isMobile = toSignal(this.isMobile$, { initialValue: false });

  readonly isMenuOpened = signal(false);

  readonly mobileMenuTogglerIcon = computed(() => {
    return this.isMenuOpened() ? 'close' : 'menu';
  });

  readonly scrollY = signal<number>(0);

  readonly isScrolled = computed(() => this.scrollY() > 10);

  onWindowScroll() {
    this.scrollY.set(window.scrollY || document.documentElement.scrollTop);
  }

  closeMenu() {
    this.isMenuOpened.set(false);
  }

  toggleMenu() {
    this.isMenuOpened.update((prev) => !prev);
  }
}
