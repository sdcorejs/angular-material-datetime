import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, booleanAttribute, computed,
  inject, input, output, signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SdDateAdapter } from '../core/date-adapter';
import { SdDatetimeIntl } from '../core/datetime-intl';
import { normalizeSdMinuteStep } from '../core/default-options';

@Component({
  selector: 'sd-time-spinner',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './time-spinner.component.html',
  styleUrls: ['./time-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sd-time-spinner' },
})
export class SdTimeSpinner<D = Date> implements OnDestroy {
  readonly #adapter = inject<SdDateAdapter<D>>(SdDateAdapter as never);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly intl = inject(SdDatetimeIntl);
  readonly #intlSubscription = this.intl.changes.subscribe(() => this.#cdr.markForCheck());

  readonly value = input<D | null>(null);
  readonly baseValue = input<D | null>(null);
  readonly showSeconds = input(false, { transform: booleanAttribute });
  readonly stepMinute = input(1, { transform: normalizeSdMinuteStep });
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly valueChange = output<D>();

  readonly #effectiveValue = computed(() => this.value() ?? this.baseValue() ?? this.#adapter.today());
  readonly hour = computed(() => this.#adapter.getHour(this.#effectiveValue()));
  readonly minute = computed(() => this.#adapter.getMinute(this.#effectiveValue()));
  readonly second = computed(() => this.#adapter.getSecond(this.#effectiveValue()));

  readonly #focusedUnit = signal<'hour' | 'minute' | 'second' | null>(null);

  /**
   * Keeps the active time segment easy to edit.
   * Focused fields show the raw number so typing replaces naturally, while
   * blurred fields are padded to the standard two-digit time format.
   */
  readonly displayHour = computed(() =>
    this.#focusedUnit() === 'hour' ? String(this.hour()) : String(this.hour()).padStart(2, '0'),
  );
  readonly displayMinute = computed(() =>
    this.#focusedUnit() === 'minute' ? String(this.minute()) : String(this.minute()).padStart(2, '0'),
  );
  readonly displaySecond = computed(() =>
    this.#focusedUnit() === 'second' ? String(this.second()) : String(this.second()).padStart(2, '0'),
  );

  setFocus(unit: 'hour' | 'minute' | 'second'): void { this.#focusedUnit.set(unit); }
  clearFocus(): void { this.#focusedUnit.set(null); }

  stepHourUp(): void { this.#step('hour', +1); }
  stepHourDown(): void { this.#step('hour', -1); }
  stepMinuteUp(): void { this.#step('minute', +this.stepMinute()); }
  stepMinuteDown(): void { this.#step('minute', -this.stepMinute()); }
  stepSecondUp(): void { this.#step('second', +1); }
  stepSecondDown(): void { this.#step('second', -1); }

  /**
   * Applies spinner button changes with wrap-around semantics.
   * This keeps hour/minute/second controls fast to use: 23 + 1 becomes 0,
   * 0 - 1 becomes 23 for hours, and minute/second values wrap at 60.
   */
  #step(unit: 'hour' | 'minute' | 'second', delta: number): void {
    if (this.disabled()) return;
    const base = this.#effectiveValue();
    let next = this.#adapter.clone(base);
    if (unit === 'hour') next = this.#adapter.setHour(next, this.#wrap(this.#adapter.getHour(base) + delta, 24));
    if (unit === 'minute') next = this.#adapter.setMinute(next, this.#wrap(this.#adapter.getMinute(base) + delta, 60));
    if (unit === 'second') next = this.#adapter.setSecond(next, this.#wrap(this.#adapter.getSecond(base) + delta, 60));
    this.valueChange.emit(next);
  }

  /**
   * Normalizes positive and negative values into the `[0, mod)` range.
   * JavaScript's `%` keeps the sign of negative numbers, so the second modulo
   * pass is required for backward stepping to wrap correctly.
   */
  #wrap(v: number, mod: number): number {
    return ((v % mod) + mod) % mod;
  }

  onInputEvent(unit: 'hour' | 'minute' | 'second', event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) this.#setUnit(unit, target.value, 0, unit === 'hour' ? 23 : 59);
  }

  onHourInput(raw: string): void { this.#setUnit('hour', raw, 0, 23); }
  onMinuteInput(raw: string): void { this.#setUnit('minute', raw, 0, 59); }
  onSecondInput(raw: string): void { this.#setUnit('second', raw, 0, 59); }

  onDigitKeyDown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && /^[acvx]$/i.test(event.key)) return;
    const allowed = new Set([
      'Backspace', 'Delete', 'Tab', 'Enter', 'Escape',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End',
    ]);
    if (allowed.has(event.key)) return;
    if (!/^\d$/.test(event.key)) event.preventDefault();
  }

  onSpinKeyDown(unit: 'hour' | 'minute' | 'second', event: KeyboardEvent): void {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown' && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    if (event.key === 'ArrowUp') this.#step(unit, unit === 'minute' ? this.stepMinute() : 1);
    if (event.key === 'ArrowDown') this.#step(unit, unit === 'minute' ? -this.stepMinute() : -1);
    if (event.key === 'Home') this.#setUnit(unit, '0', 0, unit === 'hour' ? 23 : 59);
    if (event.key === 'End') this.#setUnit(unit, unit === 'hour' ? '23' : '59', 0, unit === 'hour' ? 23 : 59);
  }

  /**
   * Handles direct keyboard input for one time segment.
   * Non-digits are removed, the value is capped to two characters, then clamped
   * to the valid range for that segment before a new immutable Date is emitted.
   */
  #setUnit(unit: 'hour' | 'minute' | 'second', raw: string, min: number, max: number): void {
    if (this.disabled()) return;
    const cleaned = raw.replace(/\D/g, '').slice(0, 2);
    if (cleaned === '') return;
    const v = Number.parseInt(cleaned, 10);
    const clamped = Math.min(Math.max(v, min), max);
    const base = this.#effectiveValue();
    let next = this.#adapter.clone(base);
    if (unit === 'hour') next = this.#adapter.setHour(next, clamped);
    if (unit === 'minute') next = this.#adapter.setMinute(next, clamped);
    if (unit === 'second') next = this.#adapter.setSecond(next, clamped);
    this.valueChange.emit(next);
  }

  ngOnDestroy(): void { this.#intlSubscription.unsubscribe(); }
}
