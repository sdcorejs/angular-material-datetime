# @sdcorejs/angular-material-datetime

Standalone datetime picker components for Angular Material.

This is the main package. It contains the working picker UI, input and toggle directives, action directives, `sd-time-spinner`, the shared adapter contract, and the native JavaScript `Date` adapter.

## Install

```bash
npm install @sdcorejs/angular-material-datetime @angular/material @angular/cdk
```

## Configure

Register the native adapter once in `app.config.ts`:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideSdNativeDateAdapter } from '@sdcorejs/angular-material-datetime';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSdNativeDateAdapter(),
  ],
};
```

## Basic Usage

```ts
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  SdDatetimePicker,
  SdDatetimePickerInput,
  SdDatetimePickerToggle,
} from '@sdcorejs/angular-material-datetime';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SdDatetimePicker,
    SdDatetimePickerInput,
    SdDatetimePickerToggle,
  ],
  template: `
    <mat-form-field>
      <mat-label>Start time</mat-label>
      <input matInput [sdDatetimePicker]="picker" [formControl]="startAt">
      <button mat-button matSuffix type="button" [sdDatetimePickerToggle]="picker">
        Open
      </button>
      <sd-datetime-picker #picker></sd-datetime-picker>
    </mat-form-field>
  `,
})
export class ExampleComponent {
  readonly startAt = new FormControl<Date | null>(null);
}
```

## Picker API

```html
<sd-datetime-picker
  #picker
  [showSeconds]="true"
  [stepMinute]="5"
  [touchUi]="false"
  [disabled]="false"
  [minDate]="minDate"
  [maxDate]="maxDate"
  [startAt]="initialDate"
  (applied)="save($event)"
  (closed)="onClosed()">
</sd-datetime-picker>
```

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `showSeconds` | `boolean` | `false` | Shows the seconds column. |
| `stepMinute` | `number` | `1` | Strict minute step; invalid configuration normalizes to `1`. |
| `touchUi` | `boolean` | `false` | Uses a centered, viewport-constrained overlay. |
| `disabled` | `boolean` | `false` | Prevents opening the picker. |
| `minDate` | `D \| null` | `null` | Inclusive minimum full datetime. |
| `maxDate` | `D \| null` | `null` | Inclusive maximum full datetime. |
| `startAt` | `D \| null` | `null` | Initial calendar date/month. |

| Output | Payload | Description |
| --- | --- | --- |
| `applied` | `D` | Fires when Apply is clicked. |
| `cleared` | `void` | Fires when the picker is cleared. |
| `closed` | `SdDatetimeCloseReason` | Fires with the close reason after the overlay closes. |

The input directive exposes `sdDatetimeParse`, `sdDatetimeMin`, `sdDatetimeMax`, and `sdDatetimeMinuteStep` Angular validation errors.

## Defaults and internationalization

Provide `SD_DATETIME_DEFAULT_OPTIONS` to configure `showSeconds`, `stepMinute`, and `touchUi` globally. Explicit component inputs take precedence.

Provide a subclass of `SdDatetimeIntl` to translate dialog, action, spinner, and increment/decrement labels. Call `changes.next()` after updating labels at runtime.

## Custom Actions

By default, the picker renders Now, Cancel, and Apply. Project your own action row to replace those buttons:

```html
<sd-datetime-picker #picker>
  <sd-datetime-picker-actions>
    <button mat-button type="button" sdDatetimePickerNow>Now</button>
    <button mat-button type="button" sdDatetimePickerCancel>Cancel</button>
    <button mat-flat-button type="button" sdDatetimePickerApply>Apply</button>
  </sd-datetime-picker-actions>
</sd-datetime-picker>
```

```ts
import {
  SdDatetimePickerActions,
  SdDatetimePickerApply,
  SdDatetimePickerCancel,
  SdDatetimePickerNow,
} from '@sdcorejs/angular-material-datetime';
```

## Time Spinner

`sd-time-spinner` can also be used directly:

```html
<sd-time-spinner
  [value]="value"
  [showSeconds]="true"
  [stepMinute]="15"
  (valueChange)="value = $event">
</sd-time-spinner>
```

## Adapter Contract

The package ships with `SdNativeDateAdapter` and `provideSdNativeDateAdapter()` for JavaScript `Date`.

Custom adapters can extend `SdDateAdapter<D>` when an application needs another date type. The adapter must implement hour, minute, second, and datetime creation helpers on top of Angular Material's `DateAdapter<D>`.

## Peer Dependencies

| Dependency | Supported range |
| --- | --- |
| `@angular/core` | `>=19.0.0 <22.0.0` |
| `@angular/common` | `>=19.0.0 <22.0.0` |
| `@angular/forms` | `>=19.0.0 <22.0.0` |
| `@angular/material` | `>=19.0.0 <22.0.0` |
| `@angular/cdk` | `>=19.0.0 <22.0.0` |
| `rxjs` | `^7.0.0` |

Angular 19, 20, and 21 are verified with clean production consumer builds that install the packed Angular Package Format output.

## Related Packages

- `@sdcorejs/angular-material-datetime-moment`
- `@sdcorejs/angular-material-datetime-date-fns`

These package names are placeholders with empty public APIs and are excluded from the current release workflow.

## License

MIT
