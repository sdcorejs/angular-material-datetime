import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCalendar } from '@angular/material/datepicker';
import { SdDateAdapter } from '../core/date-adapter';
import { SdTimeSpinner } from '../time-spinner/time-spinner.component';

@Component({
  selector: 'sd-datetime-picker',
  standalone: true,
  imports: [CommonModule, MatCalendar, SdTimeSpinner],
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sd-datetime-picker' },
})
export class SdDatetimePicker<D = Date> {
  protected readonly adapter = inject<SdDateAdapter<D>>(SdDateAdapter as never);

  public readonly showSeconds = input<boolean>(false);
  public readonly stepMinute = input<number>(1);
  public readonly disabled = input<boolean>(false);
  public readonly minDate = input<D | null>(null);
  public readonly maxDate = input<D | null>(null);
  public readonly startAt = input<D | null>(null);

  public readonly selectedChange = output<D>();
  public readonly closed = output<void>();
  public readonly applied = output<D>();
  public readonly cleared = output<void>();

  private readonly _selected = signal<D | null>(null);
  private readonly _opened = signal<boolean>(false);

  public readonly selected = computed(() => this._selected());
  public readonly opened = computed(() => this._opened());

  public open(): void {
    if (this.disabled()) return;
    this._opened.set(true);
  }

  public close(): void {
    if (!this._opened()) return;
    this._opened.set(false);
    this.closed.emit();
  }

  public select(value: D): void {
    this._selected.set(value);
  }

  public apply(): void {
    const v = this._selected();
    if (v != null) this.applied.emit(v);
    this.close();
  }

  public clear(): void {
    this._selected.set(null);
    this.cleared.emit();
    this.close();
  }
}
