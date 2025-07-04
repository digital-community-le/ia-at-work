import { Directive, inject, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TesseramentoReminderComponent } from '../components/tesseramento-reminder/tesseramento-reminder.component';
import { environment } from '../../environments/environment';

@Directive({
  selector: '[appTesseramentoReminder]',
  host: {
    '(click)': 'openDialog()'
  },
})
export class TesseramentoReminderDirective {
  private readonly dialog = inject(MatDialog);

  readonly tesseramentoCompleted = output<boolean>();

  openDialog() {
    const showReminder = environment.tesseramentoEnabled;
    // Check if the tesseramento reminder is enabled
    if (!showReminder) {
      this.tesseramentoCompleted.emit(true);
      return;
    }

    this.dialog.open(TesseramentoReminderComponent, {
      disableClose: false,
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.tesseramentoCompleted.emit(true);
      } else {
        console.warn('Tesseramento Reminder dialog was closed without action');
      }
    });
  }
}
