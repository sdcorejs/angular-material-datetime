import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { SdDatetimePicker } from './datetime-picker.component';

@Directive({
  selector: 'button[sdDatetimePickerToggle]',
  standalone: true,
  host: {
    'type': 'button',
    '[disabled]': 'target().disabledEffective() || null',
    '[attr.aria-disabled]': 'target().disabledEffective()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'target().opened()',
    '[attr.aria-controls]': 'target().panelId',
  },
})
export class SdDatetimePickerToggle<D> {
  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly target = input.required<SdDatetimePicker<D>>({ alias: 'sdDatetimePickerToggle' });

  @HostListener('click') onClick(): void {
    const p = this.target();
    if (p.disabledEffective()) return;
    if (p.opened()) {
      p.cancel();
    } else {
      p.setOpenOrigin(this.#elementRef.nativeElement);
      p.open();
    }
  }
}
