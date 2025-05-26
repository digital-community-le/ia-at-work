import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, MatSidenavModule, NavigationComponent, FooterComponent, MatDividerModule],
  template: `
  <header class="header">
    <app-header (toggleMenu)="drawer.toggle()"></app-header>
  </header>

  <mat-drawer-container class="drower-container" autosize>
    <mat-drawer #drawer class="sidenav" mode="over">
      <app-navigation class="nav-list"></app-navigation>
    </mat-drawer>

    <section class="content">
      <router-outlet></router-outlet>
    </section>

    <mat-divider class="divider"></mat-divider>

    <app-footer class="footer"></app-footer>
  </mat-drawer-container>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
}
