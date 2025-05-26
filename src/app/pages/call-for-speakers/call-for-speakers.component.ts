import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-call-for-speakers',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './call-for-speakers.component.html',
  styleUrls: ['./call-for-speakers.component.css']
})
export class CallForSpeakersComponent {}
