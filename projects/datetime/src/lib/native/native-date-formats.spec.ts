import { SD_NATIVE_DATE_FORMATS } from './native-date-formats';

describe('SD_NATIVE_DATE_FORMATS', () => {
  it('has parse.datetimeInput', () => {
    expect(SD_NATIVE_DATE_FORMATS.parse.datetimeInput).toBeDefined();
  });
  it('has display.popupHeaderDateLabel', () => {
    expect(SD_NATIVE_DATE_FORMATS.display.popupHeaderDateLabel).toBeDefined();
  });
});
