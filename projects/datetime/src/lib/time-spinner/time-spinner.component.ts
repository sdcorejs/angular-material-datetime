import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
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
  public readonly value = input<Date | null>(null);
  public readonly showSeconds = input<boolean>(false);
  public readonly stepMinute = input<number>(1);
  public readonly disabled = input<boolean>(false);

  public readonly valueChange = output<Date>();

  public readonly hour = computed(() => this.value()?.getHours() ?? 0);
  public readonly minute = computed(() => this.value()?.getMinutes() ?? 0);
  public readonly second = computed(() => this.value()?.getSeconds() ?? 0);

  public stepHourUp(): void { this.#step('hour', +1); }
  public stepHourDown(): void { this.#step('hour', -1); }
  public stepMinuteUp(): void { this.#step('minute', +this.stepMinute()); }
  public stepMinuteDown(): void { this.#step('minute', -this.stepMinute()); }
  public stepSecondUp(): void { this.#step('second', +1); }
  public stepSecondDown(): void { this.#step('second', -1); }

  // delta ขึ้น/ลง พร้อม wrap-around เพื่อให้ 23+1=0, 0-1=23 เป็นต้น
  #step(unit: 'hour' | 'minute' | 'second', delta: number): void {
    if (this.disabled()) return;
    const base = this.value() ?? new Date(2026, 0, 1, 0, 0, 0);
    const next = new Date(base);
    if (unit === 'hour') next.setHours(this.#wrap(base.getHours() + delta, 24));
    if (unit === 'minute') next.setMinutes(this.#wrap(base.getMinutes() + delta, 60));
    if (unit === 'second') next.setSeconds(this.#wrap(base.getSeconds() + delta, 60));
    this.valueChange.emit(next);
  }

  // modulo ที่รองรับค่าลบ: ((v % mod) + mod) % mod
  #wrap(v: number, mod: number): number {
    return ((v % mod) + mod) % mod;
  }
}
