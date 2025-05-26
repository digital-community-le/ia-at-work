import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-call-for-sponsor',
  templateUrl: './call-for-sponsor.component.html',
  styleUrls: ['./call-for-sponsor.component.css']
})
export class CallForSponsorComponent {
}
