import { Directive, HostListener, inject } from '@angular/core';
import { SdDatetimePicker } from './datetime-picker.component';

@Directive({
  selector: 'button[sdDatetimePickerClear]',
  standalone: true,
  host: { 'type': 'button' },
})
export class SdDatetimePickerClear {
  private readonly picker = inject<SdDatetimePicker<unknown>>(SdDatetimePicker);
  @HostListener('click') public onClick(): void { this.picker.clear(); }
}
