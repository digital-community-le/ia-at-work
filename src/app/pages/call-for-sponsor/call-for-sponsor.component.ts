import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent],
  selector: 'app-call-for-sponsor',
  templateUrl: './call-for-sponsor.component.html',
  styleUrls: ['./call-for-sponsor.component.css']
})
export class CallForSponsorComponent {
}
