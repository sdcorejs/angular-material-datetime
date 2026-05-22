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
} from '@sdcorejs/angular-material-datetime';

@Component({
  imports: [
    ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule,
    SdDatetimePicker, SdDatetimePickerInput, SdDatetimePickerToggle,
  ],
  template: `
    <!-- Minimal: defaults (Now / Cancel / Apply) render automatically -->
    <mat-form-field>
      <input matInput [sdDatetimePicker]="picker" [formControl]="ctrl">
      <button matSuffix [sdDatetimePickerToggle]="picker">Open</button>
      <sd-datetime-picker #picker [showSeconds]="true"></sd-datetime-picker>
    </mat-form-field>
  `,
})
export class MyComponent {
  ctrl = new FormControl<Date | null>(null);
}
```

### Customizing actions

Project your own `<sd-datetime-picker-actions>` block to override the defaults — for example, Vietnamese labels:

```html
<sd-datetime-picker #picker>
  <sd-datetime-picker-actions>
    <button mat-button sdDatetimePickerNow>Bây giờ</button>
    <button mat-button sdDatetimePickerCancel>Hủy</button>
    <button mat-flat-button sdDatetimePickerApply>Xác nhận</button>
  </sd-datetime-picker-actions>
</sd-datetime-picker>
```

The component imports in your `@Component` decorator can drop `SdDatetimePickerActions`, `SdDatetimePickerNow`, `SdDatetimePickerCancel`, and `SdDatetimePickerApply` if you're using the defaults — they're only needed when projecting custom content.

## Compatibility

| Angular | `@sdcorejs/angular-material-datetime` |
|---|---|
| 19.x | 0.1.x |
| 20.x | 0.1.x |
| 21.x | 0.1.x |

## Theming — Material 2 and Material 3

The library works out-of-the-box with both Material 2 and Material 3 themes.

- **Material 3** (`mat.theme(...)`, recommended): the picker reads `--mat-sys-surface-container`, `--mat-sys-primary`, `--mat-sys-outline-variant`, and `--mat-sys-on-surface-variant` system tokens — colors automatically follow your app's theme (including dark mode).
- **Material 2** (legacy `mat.core() + mat.all-component-themes($theme)`): the M3 tokens are not defined, so the picker falls back to neutral defaults (`#fff` surface, `#1976d2` primary, etc.). All Material primitives inside the picker (`<mat-calendar>`, `<mat-icon-button>`, `<mat-button>`) are still themed by Material itself.
- **Hybrid M2 + M3** (e.g. apps mid-migration that include both `mat.theme(...)` and `mat.all-component-themes(...)`): both layers coexist; the picker prefers M3 tokens when present.

For best visual harmony, use Material 3. Material 2 is fully supported but the picker chrome (surface, divider) will not pick up your M2 palette without a custom override.

## Packages

| Package | Status |
|---|---|
| `@sdcorejs/angular-material-datetime` | v0.1 (datetime picker + native adapter) |
| `@sdcorejs/angular-material-datetime-moment` | planned |
| `@sdcorejs/angular-material-datetime-date-fns` | planned |

## License

MIT — see [LICENSE](./LICENSE).
