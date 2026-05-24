import {
  ChangeDetectionStrategy, Component, OnDestroy, TemplateRef, ViewEncapsulation, booleanAttribute,
  ViewContainerRef, computed, inject, input, output, signal, viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatCalendar } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SdDateAdapter } from '../core/date-adapter';
import { SdTimeSpinner } from '../time-spinner/time-spinner.component';

export type SdDatetimeInput<D> = D | Date | number | string | null | undefined;

/**
 * Accepts the common date-like values Angular templates pass to picker inputs.
 * `null`, `undefined`, and empty strings mean "no bound", valid `Date`,
 * timestamp, and date-string values become a selectable date value, and existing
 * adapter-specific instances pass through unchanged for custom adapters.
 */
function coerceDatetimeInput<D>(value: SdDatetimeInput<D>): D | null {
  if (value == null || value === '') return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value as D;
  }

  if (typeof value === 'number' || typeof value === 'string') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date as D;
  }

  return value as D;
}

@Component({
  selector: 'sd-datetime-picker',
  standalone: true,
  imports: [CommonModule, MatCalendar, SdTimeSpinner, MatButtonModule, MatIconModule],
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'sd-datetime-picker' },
})
export class SdDatetimePicker<D = Date> implements OnDestroy {
  readonly #overlay = inject(Overlay);
  readonly #vcr = inject(ViewContainerRef);
  readonly #adapter = inject<SdDateAdapter<D>>(SdDateAdapter as never);

  readonly showSeconds = input(false, { transform: booleanAttribute });
  readonly stepMinute = input<number>(1);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly minDate = input<D | null, SdDatetimeInput<D>>(null, { transform: coerceDatetimeInput });
  readonly maxDate = input<D | null, SdDatetimeInput<D>>(null, { transform: coerceDatetimeInput });
  readonly startAt = input<D | null, SdDatetimeInput<D>>(null, { transform: coerceDatetimeInput });

  readonly applied = output<D>();
  readonly cleared = output<void>();
  readonly closed = output<void>();

  readonly #selected = signal<D | null>(null);
  readonly #opened = signal(false);
  readonly #inputDisabled = signal(false);

  readonly selected = computed(() => this.#selected());
  readonly opened = computed(() => this.#opened());
  readonly disabledEffective = computed(() => this.disabled() || this.#inputDisabled());

  readonly panelTemplate = viewChild.required<TemplateRef<unknown>>('panel');

  #overlayRef: OverlayRef | null = null;
  #anchorEl: HTMLElement | null = null;

  /**
   * Stores the input element used as the overlay origin.
   * The input directive owns the DOM element, while the picker owns the overlay,
   * so this handoff keeps positioning correct without requiring consumers to pass
   * a separate origin reference.
   */
  setAnchor(el: HTMLElement | null): void { this.#anchorEl = el; }

  /**
   * Mirrors the disabled state received by the ControlValueAccessor input.
   * Angular disables the native input through `setDisabledState`, but the picker
   * and toggle are separate directives/components, so they need this explicit
   * sync to block opening from suffix buttons or direct `open()` calls.
   */
  setInputDisabledState(isDisabled: boolean): void {
    this.#inputDisabled.set(isDisabled);
    if (isDisabled) this.close();
  }

  open(): void {
    if (this.disabledEffective() || this.#opened()) return;
    const anchor = this.#anchorEl ?? document.body;
    const position = this.#overlay.position()
      .flexibleConnectedTo(anchor)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
      ])
      .withFlexibleDimensions(false)
      .withPush(true);

    this.#overlayRef = this.#overlay.create(new OverlayConfig({
      positionStrategy: position,
      scrollStrategy: this.#overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-backdrop',
      panelClass: 'sd-datetime-picker__overlay',
    }));
    this.#overlayRef.attach(new TemplatePortal(this.panelTemplate(), this.#vcr));
    // Backdrop clicks behave like Cancel: dismiss the overlay without applying the staged value.
    this.#overlayRef.backdropClick().subscribe(() => this.close());
    this.#opened.set(true);
  }

  close(): void {
    if (!this.#opened()) return;
    this.#overlayRef?.dispose();
    this.#overlayRef = null;
    this.#opened.set(false);
    this.closed.emit();
  }

  select(value: D): void { this.#selected.set(value); }

  apply(): void {
    const value = this.#selected();
    if (value != null) this.applied.emit(value);
    this.close();
  }

  clear(): void {
    this.#selected.set(null);
    this.cleared.emit();
    this.close();
  }

  now(): void {
    this.#selected.set(this.#adapter.today());
  }

  ngOnDestroy(): void { this.#overlayRef?.dispose(); }
}
