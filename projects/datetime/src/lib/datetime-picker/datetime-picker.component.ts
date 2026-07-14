import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, PLATFORM_ID, TemplateRef,
  ViewEncapsulation, ViewContainerRef, booleanAttribute, computed, inject, input, output, signal,
  viewChild,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { MatCalendar } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SdDateAdapter } from '../core/date-adapter';
import { SdTimeSpinner } from '../time-spinner/time-spinner.component';
import { SD_DATETIME_DEFAULT_OPTIONS, normalizeSdMinuteStep } from '../core/default-options';
import { SdDatetimeIntl } from '../core/datetime-intl';
import { Subscription } from 'rxjs';

export type SdDatetimeInput<D> = D | number | string | null | undefined;
export type SdDatetimeCloseReason = 'apply' | 'cancel' | 'backdrop' | 'escape' | 'clear' | 'disabled' | 'programmatic';

let nextPickerId = 0;

@Component({
  selector: 'sd-datetime-picker',
  standalone: true,
  imports: [CommonModule, A11yModule, MatCalendar, SdTimeSpinner, MatButtonModule, MatIconModule],
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
  readonly #defaults = inject(SD_DATETIME_DEFAULT_OPTIONS, { optional: true }) ?? {};
  readonly #document = inject(DOCUMENT);
  readonly #platformId = inject(PLATFORM_ID);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly intl = inject(SdDatetimeIntl);

  readonly showSeconds = input(this.#defaults.showSeconds ?? false, { transform: booleanAttribute });
  readonly stepMinute = input(normalizeSdMinuteStep(this.#defaults.stepMinute), { transform: normalizeSdMinuteStep });
  readonly touchUi = input(this.#defaults.touchUi ?? false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly minDate = input<D | null, SdDatetimeInput<D>>(null, { transform: value => this.#deserialize(value) });
  readonly maxDate = input<D | null, SdDatetimeInput<D>>(null, { transform: value => this.#deserialize(value) });
  readonly startAt = input<D | null, SdDatetimeInput<D>>(null, { transform: value => this.#deserialize(value) });

  readonly applied = output<D>();
  readonly cleared = output<void>();
  readonly closed = output<SdDatetimeCloseReason>();

  readonly #committed = signal<D | null>(null);
  readonly #draft = signal<D | null>(null);
  readonly #opened = signal(false);
  readonly #inputDisabled = signal(false);

  readonly selected = computed(() => this.#draft());
  readonly opened = computed(() => this.#opened());
  readonly disabledEffective = computed(() => this.disabled() || this.#inputDisabled());
  readonly spinnerBaseValue = computed(() =>
    this.#draft() ?? this.#committed() ?? this.startAt() ?? this.#adapter.today(),
  );

  readonly panelTemplate = viewChild.required<TemplateRef<unknown>>('panel');
  readonly panelId = `sd-datetime-picker-panel-${nextPickerId++}`;
  readonly canApply = computed(() => {
    const value = this.#draft();
    return value != null && this.isValueValid(value);
  });

  #overlayRef: OverlayRef | null = null;
  #anchorEl: HTMLElement | null = null;
  #restoreFocusEl: HTMLElement | null = null;
  #overlaySubscriptions = new Subscription();

  constructor() {
    this.#overlaySubscriptions.add(this.intl.changes.subscribe(() => this.#cdr.markForCheck()));
  }

  /**
   * Stores the input element used as the overlay origin.
   * The input directive owns the DOM element, while the picker owns the overlay,
   * so this handoff keeps positioning correct without requiring consumers to pass
   * a separate origin reference.
   */
  setAnchor(el: HTMLElement | null): void { this.#anchorEl = el; }
  setOpenOrigin(el: HTMLElement | null): void { this.#restoreFocusEl = el; }

  /**
   * Mirrors the disabled state received by the ControlValueAccessor input.
   * Angular disables the native input through `setDisabledState`, but the picker
   * and toggle are separate directives/components, so they need this explicit
   * sync to block opening from suffix buttons or direct `open()` calls.
   */
  setInputDisabledState(isDisabled: boolean): void {
    this.#inputDisabled.set(isDisabled);
    if (isDisabled) this.close('disabled');
  }

  open(): void {
    if (this.disabledEffective() || this.#opened() || !isPlatformBrowser(this.#platformId)) return;
    this.#draft.set(this.#clone(this.#committed()));
    const anchor = this.#anchorEl ?? this.#document.body;
    this.#restoreFocusEl ??= this.#activeElement() ?? this.#anchorEl;
    const position: PositionStrategy = this.touchUi()
      ? this.#overlay.position().global().centerHorizontally().centerVertically()
      : this.#overlay.position()
        .flexibleConnectedTo(anchor)
        .withPositions([
          { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
          { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
        ])
        .withFlexibleDimensions(true)
        .withViewportMargin(8)
        .withPush(true);

    this.#overlayRef = this.#overlay.create(new OverlayConfig({
      positionStrategy: position,
      scrollStrategy: this.#overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-backdrop',
      panelClass: this.touchUi()
        ? ['sd-datetime-picker__overlay', 'sd-datetime-picker__overlay--touch']
        : 'sd-datetime-picker__overlay',
    }));
    this.#overlayRef.attach(new TemplatePortal(this.panelTemplate(), this.#vcr));
    // Backdrop clicks behave like Cancel: dismiss the overlay without applying the staged value.
    this.#overlaySubscriptions.add(this.#overlayRef.backdropClick().subscribe(() => this.close('backdrop')));
    this.#overlaySubscriptions.add(this.#overlayRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this.close('escape');
      }
    }));
    this.#opened.set(true);
    this.#overlayRef.overlayElement.querySelector<HTMLElement>(`#${this.panelId}`)?.focus();
  }

  close(reason: SdDatetimeCloseReason = 'programmatic'): void {
    if (!this.#opened()) return;
    this.#draft.set(this.#clone(this.#committed()));
    const focusTarget = this.#restoreFocusEl;
    this.#restoreFocusEl = null;
    this.#overlaySubscriptions.unsubscribe();
    this.#overlaySubscriptions = new Subscription();
    this.#overlaySubscriptions.add(this.intl.changes.subscribe(() => this.#cdr.markForCheck()));
    this.#overlayRef?.dispose();
    this.#overlayRef = null;
    this.#opened.set(false);
    this.closed.emit(reason);
    focusTarget?.focus();
  }

  cancel(): void { this.close('cancel'); }

  onEscape(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.close('escape');
  }

  /** Updates the staged value without committing it to the form control. */
  select(value: D): void { this.#draft.set(this.#clone(value)); }

  selectDatePart(date: D | null): void {
    if (date == null) return;
    const timePart = this.#draft() ?? this.#committed() ?? this.startAt() ?? this.#adapter.today();
    this.#draft.set(this.#adapter.combineDateAndTime(date, timePart));
  }

  selectTimePart(time: D): void {
    const datePart = this.#draft() ?? this.#committed() ?? this.startAt() ?? this.#adapter.today();
    this.#draft.set(this.#adapter.combineDateAndTime(datePart, time));
  }

  /** Synchronizes an external form value into both picker state layers. */
  setValue(value: D | null): void {
    const committed = this.#clone(value);
    this.#committed.set(committed);
    this.#draft.set(this.#clone(committed));
  }

  apply(): void {
    const value = this.#draft();
    if (value == null || !this.isValueValid(value)) return;
    const committed = this.#clone(value);
    this.#committed.set(committed);
    this.applied.emit(this.#clone(committed) as D);
    this.close('apply');
  }

  clear(): void {
    this.#committed.set(null);
    this.#draft.set(null);
    this.cleared.emit();
    this.close('clear');
  }

  now(): void {
    this.#draft.set(this.#adapter.today());
  }

  #clone(value: D | null): D | null {
    return value == null ? null : this.#adapter.clone(value);
  }

  #deserialize(value: SdDatetimeInput<D>): D | null {
    if (value == null || value === '') return null;
    const deserialized = this.#adapter.deserialize(value);
    return deserialized != null && this.#adapter.isValid(deserialized) ? deserialized : null;
  }

  isValueValid(value: D): boolean {
    const min = this.minDate();
    const max = this.maxDate();
    return (!min || this.#adapter.compareDatetime(value, min) >= 0)
      && (!max || this.#adapter.compareDatetime(value, max) <= 0)
      && this.#adapter.getMinute(value) % this.stepMinute() === 0;
  }

  #activeElement(): HTMLElement | null {
    const active = this.#document.activeElement;
    return active instanceof HTMLElement ? active : null;
  }

  ngOnDestroy(): void {
    this.#overlaySubscriptions.unsubscribe();
    this.#overlayRef?.dispose();
  }
}
