# @sdcorejs/angular-material-datetime

Datetime, timepicker, and date-range picker for Angular Material — with the date adapter you pick.

**Status:** pre-1.0 (`v0.1.0` covers the datetime picker; timepicker, date-range, moment & date-fns adapters land in subsequent releases).

## Install

```bash
npm install @sdcorejs/angular-material-datetime @angular/material @angular/cdk
```

## Quick start (native Date adapter)

```ts
// app.config.ts
import { provideSdNativeDateAdapter } from '@sdcorejs/angular-material-datetime';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSdNativeDateAdapter({
      parse: { datetimeInput: 'M/d/yyyy h:mm a', dateInput: 'M/d/yyyy', timeInput: 'h:mm a' },
      display: {
        datetimeInput: 'M/d/yyyy h:mm a',
        dateInput: 'M/d/yyyy',
        timeInput: 'h:mm a',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'longDate',
        monthYearA11yLabel: 'MMMM yyyy',
        popupHeaderDateLabel: 'EEE, MMM d',
      },
    }),
  ],
};
```

```ts
// my.component.ts
import {
  SdDatetimePicker, SdDatetimePickerInput, SdDatetimePickerToggle,
  SdDatetimePickerActions, SdDatetimePickerApply, SdDatetimePickerCancel, SdDatetimePickerClear,
} from '@sdcorejs/angular-material-datetime';

@Component({
  imports: [
    ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule,
    SdDatetimePicker, SdDatetimePickerInput, SdDatetimePickerToggle,
    SdDatetimePickerActions, SdDatetimePickerApply, SdDatetimePickerCancel, SdDatetimePickerClear,
  ],
  template: `
    <mat-form-field>
      <input matInput [sdDatetimePicker]="picker" [formControl]="ctrl">
      <button matSuffix [sdDatetimePickerToggle]="picker">Open</button>
      <sd-datetime-picker #picker [showSeconds]="true">
        <sd-datetime-picker-actions>
          <button sdDatetimePickerClear>Clear</button>
          <button sdDatetimePickerCancel>Cancel</button>
          <button sdDatetimePickerApply>Apply</button>
        </sd-datetime-picker-actions>
      </sd-datetime-picker>
    </mat-form-field>
  `,
})
export class MyComponent {
  ctrl = new FormControl<Date | null>(null);
}
```

## Compatibility

| Angular | `@sdcorejs/angular-material-datetime` |
|---|---|
| 19.x | 0.1.x |
| 20.x | 0.1.x |
| 21.x | 0.1.x |

## Packages

| Package | Status |
|---|---|
| `@sdcorejs/angular-material-datetime` | v0.1 (datetime picker + native adapter) |
| `@sdcorejs/angular-material-datetime-moment` | planned |
| `@sdcorejs/angular-material-datetime-date-fns` | planned |

## License

MIT — see [LICENSE](./LICENSE).
