import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sd-time-spinner',
  standalone: true,
  imports: [CommonModule],
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
}
