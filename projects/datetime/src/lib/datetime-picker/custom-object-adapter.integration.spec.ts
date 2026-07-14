import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SdDateAdapter } from '../core/date-adapter';
import { SD_DATE_FORMATS, SdDateFormats } from '../core/date-formats';
import { SdTimeSpinner } from '../time-spinner/time-spinner.component';
import { SdDatetimePicker } from './datetime-picker.component';
import { SdDatetimePickerInput } from './datetime-picker-input.directive';

interface ObjectDatetime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

class ObjectDatetimeAdapter extends SdDateAdapter<ObjectDatetime> {
  override getYear(value: ObjectDatetime): number { return value.year; }
  override getMonth(value: ObjectDatetime): number { return value.month; }
  override getDate(value: ObjectDatetime): number { return value.day; }
  override getDayOfWeek(): number { return 0; }
  override getMonthNames(): string[] { return Array.from({ length: 12 }, (_, index) => String(index + 1)); }
  override getDateNames(): string[] { return Array.from({ length: 31 }, (_, index) => String(index + 1)); }
  override getDayOfWeekNames(): string[] { return ['0', '1', '2', '3', '4', '5', '6']; }
  override getYearName(value: ObjectDatetime): string { return String(value.year); }
  override getFirstDayOfWeek(): number { return 0; }
  override getNumDaysInMonth(): number { return 31; }
  override clone(value: ObjectDatetime): ObjectDatetime { return { ...value }; }
  override createDate(year: number, month: number, day: number): ObjectDatetime {
    return this.createDatetime(year, month, day, 0, 0, 0);
  }
  override today(): ObjectDatetime { return this.createDatetime(2035, 3, 4, 5, 6, 7); }
  override parse(value: unknown): ObjectDatetime | null {
    if (typeof value !== 'string') return null;
    const match = /^(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)$/.exec(value);
    return match
      ? this.createDatetime(+match[1], +match[2] - 1, +match[3], +match[4], +match[5], +match[6])
      : null;
  }
  override deserialize(value: unknown): ObjectDatetime | null {
    return this.isDateInstance(value) ? this.clone(value) : this.parse(value);
  }
  override format(value: ObjectDatetime, displayFormat: unknown): string {
    void displayFormat;
    return `${value.year}-${value.month + 1}-${value.day} ${value.hour}:${value.minute}:${value.second}`;
  }
  override addCalendarYears(value: ObjectDatetime, years: number): ObjectDatetime {
    return { ...value, year: value.year + years };
  }
  override addCalendarMonths(value: ObjectDatetime, months: number): ObjectDatetime {
    const total = value.year * 12 + value.month + months;
    return { ...value, year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
  }
  override addCalendarDays(value: ObjectDatetime, days: number): ObjectDatetime {
    return { ...value, day: value.day + days };
  }
  override toIso8601(value: ObjectDatetime): string { return this.format(value, 'iso'); }
  override isDateInstance(value: unknown): value is ObjectDatetime {
    return typeof value === 'object' && value !== null
      && ['year', 'month', 'day', 'hour', 'minute', 'second'].every(key => key in value);
  }
  override isValid(value: ObjectDatetime): boolean {
    return value.month >= 0 && value.month <= 11 && value.day >= 1 && value.day <= 31
      && value.hour >= 0 && value.hour <= 23 && value.minute >= 0 && value.minute <= 59
      && value.second >= 0 && value.second <= 59;
  }
  override invalid(): ObjectDatetime { return this.createDatetime(0, -1, 0, -1, -1, -1); }
  override getHour(value: ObjectDatetime): number { return value.hour; }
  override getMinute(value: ObjectDatetime): number { return value.minute; }
  override getSecond(value: ObjectDatetime): number { return value.second; }
  override setHour(value: ObjectDatetime, hour: number): ObjectDatetime { return { ...value, hour }; }
  override setMinute(value: ObjectDatetime, minute: number): ObjectDatetime { return { ...value, minute }; }
  override setSecond(value: ObjectDatetime, second: number): ObjectDatetime { return { ...value, second }; }
  override createDatetime(
    year: number, month: number, day: number, hour: number, minute: number, second: number,
  ): ObjectDatetime {
    return { year, month, day, hour, minute, second };
  }
}

const FORMATS: SdDateFormats<string> = {
  parse: { dateInput: 'object', datetimeInput: 'object', timeInput: 'object' },
  display: {
    dateInput: 'object', datetimeInput: 'object', datetimeInputWithSeconds: 'object', timeInput: 'object',
    monthYearLabel: 'object', dateA11yLabel: 'object', monthYearA11yLabel: 'object',
    popupHeaderDateLabel: 'object',
  },
};

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SdDatetimePicker, SdDatetimePickerInput],
  template: `
    <input [sdDatetimePicker]="picker" [formControl]="control">
    <sd-datetime-picker #picker [showSeconds]="true"></sd-datetime-picker>
  `,
})
class ObjectAdapterHost {
  readonly control = new FormControl<ObjectDatetime | null>(null);
}

describe('custom object datetime adapter integration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ObjectAdapterHost, SdTimeSpinner],
      providers: [
        ObjectDatetimeAdapter,
        { provide: SdDateAdapter, useExisting: ObjectDatetimeAdapter },
        { provide: DateAdapter, useExisting: ObjectDatetimeAdapter },
        { provide: SD_DATE_FORMATS, useValue: FORMATS },
        { provide: MAT_DATE_FORMATS, useValue: FORMATS },
      ],
    });
  });

  it('supports form write, date/time merge, Apply, parse, and Cancel without native Date', () => {
    const fixture = TestBed.createComponent(ObjectAdapterHost);
    fixture.detectChanges();
    const picker = fixture.debugElement.query(By.directive(SdDatetimePicker))
      .componentInstance as SdDatetimePicker<ObjectDatetime>;
    const original = { year: 2026, month: 6, day: 14, hour: 13, minute: 45, second: 20 };
    fixture.componentInstance.control.setValue(original);
    expect((fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement).value).toBe('2026-7-14 13:45:20');

    picker.open();
    picker.selectDatePart({ ...original, month: 7, day: 1, hour: 0, minute: 0, second: 0 });
    picker.selectTimePart({ ...original, hour: 9 });
    picker.apply();
    expect(fixture.componentInstance.control.value).toEqual({
      year: 2026, month: 7, day: 1, hour: 9, minute: 45, second: 20,
    });

    picker.open();
    picker.select({ ...original, year: 2040 });
    picker.cancel();
    expect(picker.selected()).toEqual(fixture.componentInstance.control.value);

    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    input.value = '2030-2-3 4:5:6';
    input.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.control.value).toEqual({
      year: 2030, month: 1, day: 3, hour: 4, minute: 5, second: 6,
    });
  });

  it('spinner reads and edits the plain object and falls back to adapter.today()', () => {
    const fixture = TestBed.createComponent(SdTimeSpinner<ObjectDatetime>);
    fixture.detectChanges();
    expect(fixture.componentInstance.hour()).toBe(5);
    const emitted = jest.fn();
    fixture.componentInstance.valueChange.subscribe(emitted);
    fixture.componentInstance.stepHourUp();
    expect(emitted.mock.calls[0][0]).toEqual({
      year: 2035, month: 3, day: 4, hour: 6, minute: 6, second: 7,
    });
    fixture.componentInstance.onMinuteInput('30');
    expect(emitted.mock.calls[1][0].minute).toBe(30);
  });
});
