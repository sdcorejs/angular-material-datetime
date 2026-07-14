import { SdDateFormats } from '../core/date-formats';

export type SdNativeDateFormat =
  | 'shortDate'
  | 'short'
  | 'shortTime'
  | 'datetime-with-seconds'
  | 'time-with-seconds'
  | Intl.DateTimeFormatOptions;

export const SD_NATIVE_DATE_FORMATS: SdDateFormats<SdNativeDateFormat> = {
  parse: {
    dateInput: 'shortDate',
    datetimeInput: 'short',
    timeInput: 'shortTime',
  },
  display: {
    dateInput: 'shortDate',
    datetimeInput: 'short',
    datetimeInputWithSeconds: 'datetime-with-seconds',
    timeInput: 'shortTime',
    timeInputWithSeconds: 'time-with-seconds',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
    popupHeaderDateLabel: { weekday: 'short', month: 'short', day: 'numeric' },
  },
};
