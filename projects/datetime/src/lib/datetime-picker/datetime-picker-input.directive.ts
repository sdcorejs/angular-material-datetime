import {
  Directive, ElementRef, HostListener, OnDestroy, OnInit, forwardRef,
  inject, input,
} from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { SdDateAdapter } from '../core/date-adapter';
import { SD_DATE_FORMATS, SdDateFormats } from '../core/date-formats';
import { SdDatetimePicker } from './datetime-picker.component';

@Directive({
  selector: 'input[sdDatetimePicker]',
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SdDatetimePickerInput), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => SdDatetimePickerInput), multi: true },
  ],
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'pickerOpened',
    '[attr.aria-controls]': 'pickerPanelId',
    '[disabled]': 'isDisabled || null',
  },
})
export class SdDatetimePickerInput<D = Date> implements ControlValueAccessor, Validator, OnInit, OnDestroy {
  readonly #adapter = inject<SdDateAdapter<D>>(SdDateAdapter as never);
  readonly #formats = inject<SdDateFormats>(SD_DATE_FORMATS);
  readonly #elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  readonly picker = input.required<SdDatetimePicker<D>>({ alias: 'sdDatetimePicker' });

  isDisabled = false;

  #onChange: (v: D | null) => void = () => {};
  #onTouched: () => void = () => {};
  #onValidatorChange: () => void = () => {};
  #subs = new Subscription();
  #picker: SdDatetimePicker<D> | null = null;
  #pendingValue: D | null = null;
  #parseError = false;
  #rawText = '';

  get pickerOpened(): boolean { return this.#picker?.opened() ?? false; }
  get pickerPanelId(): string | null { return this.#picker?.panelId ?? null; }

  ngOnInit(): void {
    const p = this.picker();
    this.#picker = p;
    p.setAnchor(this.#elementRef.nativeElement);
    p.setInputDisabledState(this.isDisabled);
    p.setValue(this.#pendingValue);
    this.#renderValue(this.#pendingValue);
    this.#subs.add(p.applied.subscribe((value: D) => {
      this.#onChange(value);
      this.writeValue(value);
    }));
    this.#subs.add(p.cleared.subscribe(() => {
      this.#onChange(null);
      this.writeValue(null);
    }));
    this.#subs.add(p.closed.subscribe(() => this.#onTouched()));
  }

  ngOnDestroy(): void {
    this.#subs.unsubscribe();
  }

  writeValue(value: D | null): void {
    this.#pendingValue = value;
    this.#parseError = false;
    this.#rawText = '';
    this.#renderValue(value);

    this.#picker?.setValue(value);
  }

  registerOnChange(fn: (v: D | null) => void): void { this.#onChange = fn; }
  registerOnTouched(fn: () => void): void { this.#onTouched = fn; }
  registerOnValidatorChange(fn: () => void): void { this.#onValidatorChange = fn; }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.#parseError) return { sdDatetimeParse: { text: this.#rawText } };
    const value = control.value as D | null;
    const picker = this.#picker;
    if (value == null || !picker) return null;
    const min = picker.minDate();
    const max = picker.maxDate();
    if (min && this.#adapter.compareDatetime(value, min) < 0) {
      return { sdDatetimeMin: { min, actual: value } };
    }
    if (max && this.#adapter.compareDatetime(value, max) > 0) {
      return { sdDatetimeMax: { max, actual: value } };
    }
    const step = picker.stepMinute();
    const actualMinute = this.#adapter.getMinute(value);
    return actualMinute % step === 0
      ? null
      : { sdDatetimeMinuteStep: { step, actualMinute } };
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;

    this.#picker?.setInputDisabledState(isDisabled);
  }

  @HostListener('blur') onBlur(): void { this.#onTouched(); }

  @HostListener('input', ['$event.target.value']) onInput(raw: string): void {
    this.#rawText = raw;
    if (raw.trim() === '') {
      this.#parseError = false;
      this.#picker?.setValue(null);
      this.#onChange(null);
      this.#onValidatorChange();
      return;
    }

    const parsed = this.#adapter.parse(raw, this.#formats.parse.datetimeInput) as D | null;
    const valid = parsed != null && this.#adapter.isValid(parsed);
    this.#parseError = !valid;
    if (valid) {
      this.#picker?.setValue(parsed);
      this.#onChange(parsed);
    } else {
      this.#onChange(null);
    }
    this.#onValidatorChange();
  }

  #renderValue(value: D | null): void {
    const secondsFormat = this.#formats.display.datetimeInputWithSeconds;
    const format = this.#picker?.showSeconds() && secondsFormat != null
      ? secondsFormat
      : this.#formats.display.datetimeInput;
    this.#elementRef.nativeElement.value = value == null ? '' : this.#adapter.format(value, format);
  }
}
