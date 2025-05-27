import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { APP_CONFIG } from './app.config.token';

@Component({
  standalone: true,
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    HeaderComponent,
    //NavigationComponent,
    RouterModule,
    NgIf,
    FooterComponent,
    MatDividerModule,
  ],
  template: `
    <header class="header">
      <app-header (toggleMenu)="toggleMenu()"></app-header>

      <!-- Custom mobile menu -->
      <div class="mobile-menu" *ngIf="isMobileMenuOpen">
        <nav class="menu-panel">
          <a
            *ngIf="config.features.callForSpeaker"
            mat-button
            routerLinkActive
            routerLink="/call-for-speaker"
            (click)="closeMenu()"
          >
            Call for Speaker
          </a>
          <a
            *ngIf="config.features.callForSponsor"
            mat-button
            routerLinkActive
            routerLink="/call-for-sponsor"
            (click)="closeMenu()"
          >
            Call for Sponsor
          </a>
          <a
            mat-button
            [routerLink]="['.']"
            fragment="contatti"
            (click)="closeMenu()"
            >Contatti</a
          >
        </nav>
        <div class="menu-overlay" (click)="closeMenu()"></div>
      </div>
    </header>

    <section class="content">
      <router-outlet></router-outlet>
    </section>

    <mat-divider class="divider"></mat-divider>

    <app-footer class="footer"></app-footer>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly config = inject(APP_CONFIG);
  isMobileMenuOpen = false;

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMenu() {
    this.isMobileMenuOpen = false;
  }
}
