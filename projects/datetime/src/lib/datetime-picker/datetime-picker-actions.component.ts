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
      gap: 4px;
      padding: 8px 12px 12px 12px;
      border-top: 1px solid var(--mat-sys-outline-variant, rgba(0, 0, 0, 0.08));
    }
    :host ::ng-deep button.mat-mdc-button,
    :host ::ng-deep button.mat-mdc-unelevated-button,
    :host ::ng-deep button.mat-mdc-raised-button {
      height: 32px;
      min-height: 32px;
      padding: 0 12px;
      font-size: 13px;
      line-height: 1;
    }
  `],
})
export class SdDatetimePickerActions {}
