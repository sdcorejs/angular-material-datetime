# @sdcorejs/angular-material-datetime

## 1.0.3

### Patch Changes

- Publish the ng-packagr Angular Package Format output instead of the source project, and harden datetime state, adapter independence, validation, accessibility, internationalization, responsive overlays, and package metadata for the 1.0.3 release.

## 1.0.2

### Patch Changes

- Prevent the datetime picker and toggle from opening when the bound form control is disabled.

## 1.0.1

### Patch Changes

- Improve npm README documentation with installation, usage, API, compatibility, and release guidance.

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
