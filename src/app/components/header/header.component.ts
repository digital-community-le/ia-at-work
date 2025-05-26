import { ChangeDetectionStrategy, Component, output, ViewEncapsulation } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <mat-toolbar>
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon" (click)="onToggleMenu()">
      <mat-icon>menu</mat-icon>
    </button>
    <span>IA al lavoro</span>
    <span class="spacer"></span>
  </mat-toolbar>
  `,
})
export class HeaderComponent {
  readonly toggleMenu = output<void>();

  onToggleMenu() {
    console.log('Toggle menu clicked');
    this.toggleMenu.emit(void 0);
  }
}
