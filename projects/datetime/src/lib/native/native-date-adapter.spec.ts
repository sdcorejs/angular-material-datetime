import { TestBed } from '@angular/core/testing';
import { MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';
import { SdNativeDateAdapter } from './native-date-adapter';

describe('SdNativeDateAdapter', () => {
  let adapter: SdNativeDateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
        Platform,
        SdNativeDateAdapter,
      ],
    });
    adapter = TestBed.inject(SdNativeDateAdapter);
  });

  it('extends Material NativeDateAdapter (so all date methods work)', () => {
    expect(adapter).toBeInstanceOf(NativeDateAdapter);
  });

  it('getHour returns native hours', () => {
    expect(adapter.getHour(new Date(2026, 4, 22, 14, 30, 15))).toBe(14);
  });

  it('getMinute returns native minutes', () => {
    expect(adapter.getMinute(new Date(2026, 4, 22, 14, 30, 15))).toBe(30);
  });

  it('getSecond returns native seconds', () => {
    expect(adapter.getSecond(new Date(2026, 4, 22, 14, 30, 15))).toBe(15);
  });

  it('setHour returns a new Date (immutable)', () => {
    const d = new Date(2026, 4, 22, 10, 0, 0);
    const out = adapter.setHour(d, 15);
    expect(out).not.toBe(d);
    expect(out.getHours()).toBe(15);
    expect(d.getHours()).toBe(10);
  });

  it('setMinute returns a new Date (immutable)', () => {
    const d = new Date(2026, 4, 22, 10, 0, 0);
    const out = adapter.setMinute(d, 45);
    expect(out).not.toBe(d);
    expect(out.getMinutes()).toBe(45);
    expect(d.getMinutes()).toBe(0);
  });

  it('setSecond returns a new Date (immutable)', () => {
    const d = new Date(2026, 4, 22, 10, 0, 0);
    const out = adapter.setSecond(d, 50);
    expect(out).not.toBe(d);
    expect(out.getSeconds()).toBe(50);
  });

  it('createDatetime builds a full date+time', () => {
    const d = adapter.createDatetime(2026, 4, 22, 14, 30, 15);
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(4);
    expect(d.getDate()).toBe(22);
    expect(d.getHours()).toBe(14);
    expect(d.getMinutes()).toBe(30);
    expect(d.getSeconds()).toBe(15);
  });

  it('createDatetime throws on invalid month (>11)', () => {
    expect(() => adapter.createDatetime(2026, 12, 1, 0, 0, 0)).toThrow();
  });

  it('createDatetime throws on invalid hour (>23)', () => {
    expect(() => adapter.createDatetime(2026, 4, 22, 24, 0, 0)).toThrow();
  });

  it('createDatetime throws on invalid minute (>59)', () => {
    expect(() => adapter.createDatetime(2026, 4, 22, 0, 60, 0)).toThrow();
  });

  it('createDatetime throws on invalid second (>59)', () => {
    expect(() => adapter.createDatetime(2026, 4, 22, 0, 0, 60)).toThrow();
  });

  it('format() with time-aware string returns datetime', () => {
    const d = new Date(2026, 4, 22, 14, 30, 0);
    const out = adapter.format(d, 'M/d/yyyy h:mm a');
    // Kết quả phụ thuộc locale, nhưng phải chứa phần giờ:phút
    expect(out).toMatch(/\d+:\d+/);
  });

  it('format() with date-only Intl options delegates to super', () => {
    // Khi displayFormat là object Intl.DateTimeFormatOptions (không phải string có token h/H/m/s)
    // thì override gọi super.format() → trả về chỉ ngày, không có giờ:phút
    const d = new Date(2026, 4, 22, 14, 30, 0);
    const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const out = adapter.format(d, opts);
    // Intl với date-only options → không chứa thời gian (không có dạng h:mm)
    expect(out).not.toMatch(/\d+:\d+/);
  });

  it('formats shortDate as date-only instead of inferring time tokens from its letters', () => {
    const d = new Date(2026, 4, 22, 14, 30, 45);
    expect(adapter.format(d, 'shortDate')).toBe(
      new Intl.DateTimeFormat('en-US', {
        year: 'numeric', month: 'numeric', day: 'numeric',
      }).format(d),
    );
  });

  it('formats short datetime without seconds and explicit seconds format with seconds', () => {
    const d = new Date(2026, 4, 22, 14, 30, 45);
    const withoutSeconds = adapter.format(d, 'short');
    const withSeconds = adapter.format(d, 'datetime-with-seconds');

    expect(withoutSeconds).toBe(
      new Intl.DateTimeFormat('en-US', {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: '2-digit',
      }).format(d),
    );
    expect(withSeconds).toBe(
      new Intl.DateTimeFormat('en-US', {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: '2-digit', second: '2-digit',
      }).format(d),
    );
  });

  it('deserializes timestamps and rejects an invalid numeric timestamp', () => {
    const timestamp = new Date(2026, 4, 22, 14, 30, 0).getTime();
    expect(adapter.deserialize(timestamp)).toEqual(new Date(timestamp));
    expect(adapter.isValid(adapter.deserialize(Number.NaN) as Date)).toBe(false);
    expect(adapter.deserialize('2026-05-22')).toBeInstanceOf(Date);
  });

  it('rejects unsupported string display formats explicitly', () => {
    expect(() => adapter.format(new Date(2026, 4, 22), 'unknown-format')).toThrow(
      'Unsupported native datetime format: unknown-format',
    );
  });
});
