import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

@Component({
  selector: 'app-call-for-speakers',
  standalone: true,
  imports: [PageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './call-for-speakers.component.html',
  styleUrls: ['./call-for-speakers.component.css']
})
export class CallForSpeakersComponent { }
