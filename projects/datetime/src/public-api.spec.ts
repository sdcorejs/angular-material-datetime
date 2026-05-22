import * as publicApi from './public-api';

describe('public-api exports', () => {
  it('exports SD_DATE_FORMATS', () => {
    expect(publicApi.SD_DATE_FORMATS).toBeDefined();
  });
  it('exports SdDateAdapter', () => {
    expect(publicApi.SdDateAdapter).toBeDefined();
  });
  it('exports SD_DATETIME_DEFAULT_OPTIONS', () => {
    expect(publicApi.SD_DATETIME_DEFAULT_OPTIONS).toBeDefined();
  });
});

describe('public-api — datetime-picker exports', () => {
  for (const name of [
    'SdTimeSpinner',
    'SdDatetimePicker',
    'SdDatetimePickerInput',
    'SdDatetimePickerToggle',
    'SdDatetimePickerActions',
    'SdDatetimePickerApply',
    'SdDatetimePickerCancel',
    'SdDatetimePickerClear',
    'SdDatetimePickerNow',
  ] as const) {
    it(`exports ${name}`, () => {
      expect((publicApi as Record<string, unknown>)[name]).toBeDefined();
    });
  }
});
