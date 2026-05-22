import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sd-datetime-picker-actions',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sd-datetime-picker-actions' },
  styles: [`
    :host {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 8px;
      border-top: 1px solid var(--mat-sys-outline-variant, #e0e0e0);
    }
  `],
})
export class SdDatetimePickerActions {}
