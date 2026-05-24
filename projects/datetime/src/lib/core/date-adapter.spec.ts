import { SdDateAdapter } from './date-adapter';
import { DateAdapter } from '@angular/material/core';

class TestAdapter extends SdDateAdapter<Date> {
  override getHour(d: Date): number { return d.getHours(); }
  override getMinute(d: Date): number { return d.getMinutes(); }
  override getSecond(d: Date): number { return d.getSeconds(); }
  override setHour(d: Date, h: number): Date { const c = new Date(d); c.setHours(h); return c; }
  override setMinute(d: Date, m: number): Date { const c = new Date(d); c.setMinutes(m); return c; }
  override setSecond(d: Date, s: number): Date { const c = new Date(d); c.setSeconds(s); return c; }
  override createDatetime(y: number, mo: number, d: number, h: number, mi: number, s: number): Date {
    return new Date(y, mo, d, h, mi, s);
  }
  // DateAdapter abstract stubs — minimal for the abstract test
  override getYear(): number { return 0; }
  override getMonth(): number { return 0; }
  override getDate(): number { return 0; }
  override getDayOfWeek(): number { return 0; }
  override getMonthNames(): string[] { return []; }
  override getDateNames(): string[] { return []; }
  override getDayOfWeekNames(): string[] { return []; }
  override getYearName(): string { return ''; }
  override getFirstDayOfWeek(): number { return 0; }
  override getNumDaysInMonth(): number { return 0; }
  override clone(d: Date): Date { return new Date(d); }
  override createDate(y: number, m: number, d: number): Date { return new Date(y, m, d); }
  override today(): Date { return new Date(); }
  override parse(): Date | null { return null; }
  override format(): string { return ''; }
  override addCalendarYears(d: Date): Date { return d; }
  override addCalendarMonths(d: Date): Date { return d; }
  override addCalendarDays(d: Date): Date { return d; }
  override toIso8601(d: Date): string { return d.toISOString(); }
  override isDateInstance(v: unknown): boolean { return v instanceof Date; }
  override isValid(d: Date): boolean { return !isNaN(d.getTime()); }
  override invalid(): Date { return new Date(NaN); }
}

describe('SdDateAdapter (contract)', () => {
  let adapter: TestAdapter;

  beforeEach(() => {
    adapter = new TestAdapter();
  });

  it('extends Material DateAdapter', () => {
    expect(adapter).toBeInstanceOf(DateAdapter);
  });

  it('getHour / setHour returns new immutable instance', () => {
    const d = new Date(2026, 4, 22, 10, 30, 15);
    const updated = adapter.setHour(d, 14);
    expect(updated.getHours()).toBe(14);
    expect(d.getHours()).toBe(10); // original unchanged
  });

  it('getMinute / setMinute round-trips', () => {
    const d = new Date(2026, 4, 22, 10, 30, 15);
    expect(adapter.getMinute(d)).toBe(30);
    expect(adapter.getMinute(adapter.setMinute(d, 45))).toBe(45);
  });

  it('getSecond / setSecond round-trips', () => {
    const d = new Date(2026, 4, 22, 10, 30, 15);
    expect(adapter.getSecond(d)).toBe(15);
    expect(adapter.getSecond(adapter.setSecond(d, 50))).toBe(50);
  });

  it('createDatetime constructs a date with full time-of-day', () => {
    const d = adapter.createDatetime(2026, 4, 22, 14, 30, 15);
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(4);
    expect(d.getDate()).toBe(22);
    expect(d.getHours()).toBe(14);
    expect(d.getMinutes()).toBe(30);
    expect(d.getSeconds()).toBe(15);
  });
});
