import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FeatureToggleService } from '../../services/feature-toggle.service';
import { NgOptimizedImage } from '@angular/common';
import { SPONSORS } from '../../constants/sponsors';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  protected readonly featureToggleService = inject(FeatureToggleService);

  protected readonly sponsors = [...SPONSORS].sort((a, b) => a.name.localeCompare(b.name));
}
