# @sdcorejs/angular-material-datetime-moment

## 1.0.2

### Patch Changes

- Version-aligned patch release with `@sdcorejs/angular-material-datetime@1.0.2`.

## 1.0.1

### Patch Changes

- Improve npm README documentation and clarify that the Moment adapter package is a placeholder in the 1.0.x line.

## 1.0.0

### Major Changes

- Initial public release.

  ## Features

  - `<sd-datetime-picker>` — calendar + time spinner inside a CDK Overlay panel
  - `<sd-time-spinner>` — standalone HH:MM(:SS) spinner with stepper buttons and direct numeric input
  - `[sdDatetimePicker]` — input directive with full `ControlValueAccessor` support (`[formControl]`, `formControlName`, `[(ngModel)]`)
  - `[sdDatetimePickerToggle]` — button directive that opens / closes a bound picker
  - `<sd-datetime-picker-actions>` slot — overrides the default Now / Cancel / Apply actions
  - `[sdDatetimePickerNow]`, `[sdDatetimePickerCancel]`, `[sdDatetimePickerApply]` — action directives for custom action buttons
  - Default actions render automatically when no custom actions are projected
  - `SdDateAdapter<D>` abstract — extends Material's `DateAdapter<D>` with time-of-day getters / setters
  - `SdNativeDateAdapter` + `provideSdNativeDateAdapter()` — built-in native `Date` adapter

  ## Compatibility

  Angular 19, 20, 21 (peer-dependency range).

  ## Moment and date-fns adapters

  Published as placeholder packages at this version. Adapter implementations will land in the v1.1.x line.

### Patch Changes

- Updated dependencies []:
  - @sdcorejs/angular-material-datetime@1.0.0
