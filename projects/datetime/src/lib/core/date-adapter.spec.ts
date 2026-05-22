import { SdDateAdapter } from './date-adapter';
import { DateAdapter } from '@angular/material/core';

class TestAdapter extends SdDateAdapter<Date> {
  public override getHour(d: Date): number { return d.getHours(); }
  public override getMinute(d: Date): number { return d.getMinutes(); }
  public override getSecond(d: Date): number { return d.getSeconds(); }
  public override setHour(d: Date, h: number): Date { const c = new Date(d); c.setHours(h); return c; }
  public override setMinute(d: Date, m: number): Date { const c = new Date(d); c.setMinutes(m); return c; }
  public override setSecond(d: Date, s: number): Date { const c = new Date(d); c.setSeconds(s); return c; }
  public override createDatetime(y: number, mo: number, d: number, h: number, mi: number, s: number): Date {
    return new Date(y, mo, d, h, mi, s);
  }
  // DateAdapter abstract stubs — minimal for the abstract test
  public override getYear(): number { return 0; }
  public override getMonth(): number { return 0; }
  public override getDate(): number { return 0; }
  public override getDayOfWeek(): number { return 0; }
  public override getMonthNames(): string[] { return []; }
  public override getDateNames(): string[] { return []; }
  public override getDayOfWeekNames(): string[] { return []; }
  public override getYearName(): string { return ''; }
  public override getFirstDayOfWeek(): number { return 0; }
  public override getNumDaysInMonth(): number { return 0; }
  public override clone(d: Date): Date { return new Date(d); }
  public override createDate(y: number, m: number, d: number): Date { return new Date(y, m, d); }
  public override today(): Date { return new Date(); }
  public override parse(): Date | null { return null; }
  public override format(): string { return ''; }
  public override addCalendarYears(d: Date): Date { return d; }
  public override addCalendarMonths(d: Date): Date { return d; }
  public override addCalendarDays(d: Date): Date { return d; }
  public override toIso8601(d: Date): string { return d.toISOString(); }
  public override isDateInstance(v: unknown): boolean { return v instanceof Date; }
  public override isValid(d: Date): boolean { return !isNaN(d.getTime()); }
  public override invalid(): Date { return new Date(NaN); }
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
