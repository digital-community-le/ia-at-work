import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    HeaderComponent,
    RouterModule,
    FooterComponent,
    MatDividerModule,
    MatDialogModule,
  ],
  template: `
    <header class="header">
      <app-header></app-header>
    </header>

    <main class="content">
      <router-outlet></router-outlet>
    </main>

    <app-footer class="footer"></app-footer>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
}
