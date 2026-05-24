import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sd-time-spinner',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './time-spinner.component.html',
  styleUrls: ['./time-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sd-time-spinner' },
})
export class SdTimeSpinner {
  readonly value = input<Date | null>(null);
  readonly showSeconds = input(false, { transform: booleanAttribute });
  readonly stepMinute = input<number>(1);
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly valueChange = output<Date>();

  readonly hour = computed(() => this.value()?.getHours() ?? 0);
  readonly minute = computed(() => this.value()?.getMinutes() ?? 0);
  readonly second = computed(() => this.value()?.getSeconds() ?? 0);

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
    const base = this.value() ?? new Date(2026, 0, 1, 0, 0, 0);
    const next = new Date(base);
    if (unit === 'hour') next.setHours(this.#wrap(base.getHours() + delta, 24));
    if (unit === 'minute') next.setMinutes(this.#wrap(base.getMinutes() + delta, 60));
    if (unit === 'second') next.setSeconds(this.#wrap(base.getSeconds() + delta, 60));
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

  /**
   * Handles direct keyboard input for one time segment.
   * Non-digits are removed, the value is capped to two characters, then clamped
   * to the valid range for that segment before a new immutable Date is emitted.
   */
  #setUnit(unit: 'hour' | 'minute' | 'second', raw: string, min: number, max: number): void {
    if (this.disabled()) return;
    const cleaned = (raw ?? '').replace(/\D/g, '').slice(0, 2);
    if (cleaned === '') return;
    const v = Number.parseInt(cleaned, 10);
    if (Number.isNaN(v)) return;
    const clamped = Math.min(Math.max(v, min), max);
    const base = this.value() ?? new Date(2026, 0, 1, 0, 0, 0);
    const next = new Date(base);
    if (unit === 'hour') next.setHours(clamped);
    if (unit === 'minute') next.setMinutes(clamped);
    if (unit === 'second') next.setSeconds(clamped);
    this.valueChange.emit(next);
  }
}
