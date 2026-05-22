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
});
