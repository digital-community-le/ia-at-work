import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';

export type TesseramentoReminderData = {}

@Component({
  selector: 'app-tesseramento-reminder',
  imports: [MatDialogModule, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './tesseramento-reminder.component.html',
  styleUrl: './tesseramento-reminder.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TesseramentoReminderComponent {
  private readonly dialogRef = inject(MatDialogRef<TesseramentoReminderComponent>);
  protected readonly data = inject<TesseramentoReminderData>(MAT_DIALOG_DATA, { optional: true });

  protected readonly tesseramentoModuleUrl = environment.tesseramentoUrl

  closeDialog() {
    this.dialogRef.close(true);
  }
}
