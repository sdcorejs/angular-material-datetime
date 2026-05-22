import { TestBed } from '@angular/core/testing';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { SdDateAdapter } from '../core/date-adapter';
import { SD_DATE_FORMATS } from '../core/date-formats';
import { provideSdNativeDateAdapter } from './provide-native';
import { SdNativeDateAdapter } from './native-date-adapter';
import { SD_NATIVE_DATE_FORMATS } from './native-date-formats';

describe('provideSdNativeDateAdapter', () => {
  it('binds DateAdapter and SdDateAdapter to SdNativeDateAdapter', () => {
    TestBed.configureTestingModule({ providers: [provideSdNativeDateAdapter()] });
    const dateAdapter = TestBed.inject(DateAdapter);
    const sdAdapter = TestBed.inject(SdDateAdapter as never);
    expect(dateAdapter).toBeInstanceOf(SdNativeDateAdapter);
    expect(sdAdapter).toBe(dateAdapter);
  });

  it('provides SD_NATIVE_DATE_FORMATS by default to both MAT_DATE_FORMATS and SD_DATE_FORMATS', () => {
    TestBed.configureTestingModule({ providers: [provideSdNativeDateAdapter()] });
    expect(TestBed.inject(MAT_DATE_FORMATS)).toBe(SD_NATIVE_DATE_FORMATS);
    expect(TestBed.inject(SD_DATE_FORMATS)).toBe(SD_NATIVE_DATE_FORMATS);
  });

  it('accepts custom formats override', () => {
    const custom = { ...SD_NATIVE_DATE_FORMATS, parse: { ...SD_NATIVE_DATE_FORMATS.parse, datetimeInput: 'custom-fmt' } };
    TestBed.configureTestingModule({ providers: [provideSdNativeDateAdapter(custom)] });
    expect(TestBed.inject(SD_DATE_FORMATS).parse.datetimeInput).toBe('custom-fmt');
  });
});
