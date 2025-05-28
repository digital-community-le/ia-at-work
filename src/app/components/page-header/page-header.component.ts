import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
  title = input<string>('Default Title');
  subtitle = input<string>('Default Subtitle');
}
