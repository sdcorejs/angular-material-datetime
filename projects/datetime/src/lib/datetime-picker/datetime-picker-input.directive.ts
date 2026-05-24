import {
  Directive, ElementRef, HostListener, OnDestroy, OnInit, forwardRef,
  inject, input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SdDateAdapter } from '../core/date-adapter';
import { SD_DATE_FORMATS, SdDateFormats } from '../core/date-formats';
import { SdDatetimePicker } from './datetime-picker.component';

@Directive({
  selector: 'input[sdDatetimePicker]',
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SdDatetimePickerInput), multi: true },
  ],
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[disabled]': 'isDisabled || null',
  },
})
export class SdDatetimePickerInput<D = Date> implements ControlValueAccessor, OnInit, OnDestroy {
  readonly #adapter = inject<SdDateAdapter<D>>(SdDateAdapter as never);
  readonly #formats = inject<SdDateFormats>(SD_DATE_FORMATS);
  readonly #elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  readonly picker = input.required<SdDatetimePicker<D>>({ alias: 'sdDatetimePicker' });

  isDisabled = false;

  #onChange: (v: D | null) => void = () => {};
  #onTouched: () => void = () => {};
  #subs = new Subscription();

  ngOnInit(): void {
    const p = this.picker();
    p.setAnchor(this.#elementRef.nativeElement);
    p.setInputDisabledState(this.isDisabled);
    this.#subs.add(p.applied.subscribe((value: D) => {
      this.#onChange(value);
      this.writeValue(value);
    }));
    this.#subs.add(p.cleared.subscribe(() => {
      this.#onChange(null);
      this.writeValue(null);
    }));
  }

  ngOnDestroy(): void {
    this.#subs.unsubscribe();
  }

  writeValue(value: D | null): void {
    const el = this.#elementRef.nativeElement;
    el.value = value == null
      ? ''
      : this.#adapter.format(value, this.#formats.display.datetimeInput);

    /**
     * Keep the popup selection aligned with values written by Angular forms.
     * `writeValue` can run before the required picker input is initialized, so
     * the guard allows early CVA writes while `ngOnInit` completes the binding.
     */
    try {
      if (value != null) {
        this.picker().select(value);
      }
    } catch {
      // The picker input is not ready yet; a later write will sync the visible value.
    }
  }

  registerOnChange(fn: (v: D | null) => void): void { this.#onChange = fn; }
  registerOnTouched(fn: () => void): void { this.#onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;

    /**
     * Angular forms only call this CVA method on the input directive.
     * The picker and toggle are separate instances, so forwarding the disabled
     * state prevents suffix buttons and direct picker calls from opening a
     * disabled form control.
     */
    try {
      this.picker().setInputDisabledState(isDisabled);
    } catch {
      // The picker input is not ready yet; ngOnInit forwards the latest state.
    }
  }

  @HostListener('blur') onBlur(): void { this.#onTouched(); }

  @HostListener('input', ['$event.target.value']) onInput(raw: string): void {
    const parsed = this.#adapter.parse(raw, this.#formats.parse.datetimeInput) as D | null;
    this.#onChange(parsed);
  }
}
