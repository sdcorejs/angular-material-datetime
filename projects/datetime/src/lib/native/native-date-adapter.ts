import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { SdDateAdapter } from '../core/date-adapter';

const NATIVE_FORMATS: Readonly<Record<string, Intl.DateTimeFormatOptions>> = {
  shortDate: { year: 'numeric', month: 'numeric', day: 'numeric' },
  short: {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: '2-digit',
  },
  shortTime: { hour: 'numeric', minute: '2-digit' },
  'datetime-with-seconds': {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: '2-digit', second: '2-digit',
  },
  'time-with-seconds': { hour: 'numeric', minute: '2-digit', second: '2-digit' },
  // Retain the pattern documented by previous releases without guessing from
  // arbitrary characters in a format name such as `shortDate`.
  'M/d/yyyy h:mm a': {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  },
};

@Injectable()
export class SdNativeDateAdapter extends NativeDateAdapter implements SdDateAdapter<Date> {

  override deserialize(value: unknown): Date | null {
    if (typeof value === 'number') {
      const date = new Date(value);
      return this.isValid(date) ? date : this.invalid();
    }
    return super.deserialize(value);
  }

  override format(date: Date, displayFormat: unknown): string {
    if (typeof displayFormat === 'string') {
      const options = NATIVE_FORMATS[displayFormat];
      if (!options) {
        throw new Error(`Unsupported native datetime format: ${displayFormat}`);
      }
      return new Intl.DateTimeFormat(this.locale, options).format(date);
    }
    return super.format(date, displayFormat as Intl.DateTimeFormatOptions);
  }

  getHour(date: Date): number { return date.getHours(); }
  getMinute(date: Date): number { return date.getMinutes(); }
  getSecond(date: Date): number { return date.getSeconds(); }

  setHour(date: Date, hour: number): Date {
    const c = new Date(date);
    c.setHours(hour);
    return c;
  }

  setMinute(date: Date, minute: number): Date {
    const c = new Date(date);
    c.setMinutes(minute);
    return c;
  }

  setSecond(date: Date, second: number): Date {
    const c = new Date(date);
    c.setSeconds(second);
    return c;
  }

  createDatetime(
    year: number, month: number, date: number,
    hour: number, minute: number, second: number,
  ): Date {
    if (month < 0 || month > 11) throw Error(`month ${month} out of range [0,11]`);
    if (hour < 0 || hour > 23) throw Error(`hour ${hour} out of range [0,23]`);
    if (minute < 0 || minute > 59) throw Error(`minute ${minute} out of range [0,59]`);
    if (second < 0 || second > 59) throw Error(`second ${second} out of range [0,59]`);
    return new Date(year, month, date, hour, minute, second);
  }

  combineDateAndTime(datePart: Date, timePart: Date): Date {
    return this.createDatetime(
      this.getYear(datePart), this.getMonth(datePart), this.getDate(datePart),
      this.getHour(timePart), this.getMinute(timePart), this.getSecond(timePart),
    );
  }

  compareDatetime(first: Date, second: Date): number {
    return Math.sign(first.getTime() - second.getTime());
  }
}
