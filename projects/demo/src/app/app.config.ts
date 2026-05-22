import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideSdNativeDateAdapter } from '@sdcorejs/angular-material-datetime';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideSdNativeDateAdapter({
      parse: {
        dateInput: 'M/d/yyyy',
        datetimeInput: 'M/d/yyyy h:mm a',
        timeInput: 'h:mm a',
      },
      display: {
        dateInput: 'M/d/yyyy',
        datetimeInput: 'M/d/yyyy h:mm a',
        timeInput: 'h:mm a',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'longDate',
        monthYearA11yLabel: 'MMMM yyyy',
        popupHeaderDateLabel: 'EEE, MMM d',
      },
    }),
  ],
};
