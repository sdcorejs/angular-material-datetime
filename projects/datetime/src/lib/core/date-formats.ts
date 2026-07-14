import { InjectionToken } from '@angular/core';

export interface SdDateFormats<F = unknown> {
  parse: {
    dateInput: F;
    datetimeInput: F;
    timeInput: F;
  };
  display: {
    dateInput: F;
    datetimeInput: F;
    datetimeInputWithSeconds?: F;
    timeInput: F;
    timeInputWithSeconds?: F;
    monthYearLabel: F;
    dateA11yLabel: F;
    monthYearA11yLabel: F;
    popupHeaderDateLabel: F;
  };
}

export const SD_DATE_FORMATS = new InjectionToken<SdDateFormats>('sd-date-formats');
