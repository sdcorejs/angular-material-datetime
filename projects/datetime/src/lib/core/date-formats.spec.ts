import { SD_DATE_FORMATS, SdDateFormats } from './date-formats';
import { InjectionToken } from '@angular/core';

describe('SD_DATE_FORMATS', () => {
  it('is an InjectionToken', () => {
    expect(SD_DATE_FORMATS).toBeInstanceOf(InjectionToken);
  });

  it('typings expose parse + display sub-objects', () => {
    const fmts: SdDateFormats = {
      parse: { dateInput: 'a', datetimeInput: 'b', timeInput: 'c' },
      display: {
        dateInput: 'd', datetimeInput: 'e', timeInput: 'f',
        monthYearLabel: 'g', dateA11yLabel: 'h',
        monthYearA11yLabel: 'i', popupHeaderDateLabel: 'j',
      },
    };
    expect(fmts.parse.dateInput).toBe('a');
    expect(fmts.display.popupHeaderDateLabel).toBe('j');
  });
});
