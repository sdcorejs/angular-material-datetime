# @sdcorejs/angular-material-datetime

<p align="center">
  <img src="https://raw.githubusercontent.com/sdcorejs/angular-material-datetime/main/projects/demo/public/brand/logo.png" alt="SDCoreJS" width="120" />
</p>

<p align="center">
  <b>Datetime, timepicker, and date-range picker for Angular Material — with the date adapter you pick.</b>
</p>

<p align="center">
  Standalone components · Signal-driven · Material 3 only · Adapter-pluggable
</p>

<p align="center">

  <a href="https://www.npmjs.com/package/@sdcorejs/angular-material-datetime">
    <img src="https://img.shields.io/npm/v/@sdcorejs/angular-material-datetime.svg" alt="npm version" />
  </a>

  <a href="https://www.npmjs.com/package/@sdcorejs/angular-material-datetime">
    <img src="https://img.shields.io/npm/dm/@sdcorejs/angular-material-datetime.svg" alt="npm downloads" />
  </a>

  <a href="https://github.com/sdcorejs/angular-material-datetime/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/sdcorejs/angular-material-datetime/release.yml" alt="build status" />
  </a>

  <a href="https://github.com/sdcorejs/angular-material-datetime/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/sdcorejs/angular-material-datetime" alt="license" />
  </a>

  <a href="https://www.npmjs.com/package/@sdcorejs/angular-material-datetime">
    <img src="https://img.shields.io/npm/types/@sdcorejs/angular-material-datetime" alt="types included" />
  </a>

  <a href="https://github.com/sdcorejs/angular-material-datetime/stargazers">
    <img src="https://img.shields.io/github/stars/sdcorejs/angular-material-datetime?style=flat" alt="stars" />
  </a>

</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@sdcorejs/angular-material-datetime">npm</a>
  ·
  <a href="https://github.com/sdcorejs/angular-material-datetime">GitHub</a>
  ·
  <a href="https://sdcorejs.github.io/angular-material-datetime/">Live Demo</a>
  ·
  <a href="https://sdcorejs.github.io/angular-material-datetime/#api">API Reference</a>
</p>

---

## ✨ Features

* ✅ `<sd-datetime-picker>` — calendar + time spinner inside a CDK Overlay
* ✅ `[sdDatetimePicker]` input directive — full `ControlValueAccessor` support (`[formControl]`, `formControlName`, `[(ngModel)]`)
* ✅ Default actions render automatically (Now / Cancel / Apply) — projection-based override available
* ✅ Adapter-pluggable — pick native, Moment, date-fns, or your own
* ✅ Standalone-only components — no NgModule
* ✅ Signal-driven (Angular 19+ `input()`, `model()`, `output()`, `signal()`, `computed()`)
* ✅ Material 3 theming with system-token support and dark-mode compatibility
* ✅ Tree-shakable — only what you import is bundled
* ✅ Tested — 106 unit tests, 95%+ coverage on adapter contracts

---

## 📦 Installation

```bash
npm install @sdcorejs/angular-material-datetime @angular/material @angular/cdk
```

Then register the date adapter in your `app.config.ts`:

```ts
import { provideSdNativeDateAdapter } from '@sdcorejs/angular-material-datetime';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSdNativeDateAdapter(),
  ],
};
```

---

## 🚀 Quick Examples

### Minimal datetime picker

```ts
import {
  SdDatetimePicker, SdDatetimePickerInput, SdDatetimePickerToggle,
} from '@sdcorejs/angular-material-datetime';

@Component({
  imports: [
    ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule,
    SdDatetimePicker, SdDatetimePickerInput, SdDatetimePickerToggle,
  ],
  template: `
    <mat-form-field>
      <mat-label>Pick a datetime</mat-label>
      <input matInput [sdDatetimePicker]="picker" [formControl]="ctrl">
      <button matSuffix [sdDatetimePickerToggle]="picker">Open</button>
      <sd-datetime-picker #picker></sd-datetime-picker>
    </mat-form-field>
  `,
})
export class MyComponent {
  ctrl = new FormControl<Date | null>(null);
}
```

The default actions (Now / Cancel / Apply) render automatically. Nothing else needed.

---

### Customizing actions

Project your own `<sd-datetime-picker-actions>` block to fully replace the defaults — for example, Vietnamese labels:

```html
<sd-datetime-picker #picker>
  <sd-datetime-picker-actions>
    <button mat-button sdDatetimePickerNow>Bây giờ</button>
    <button mat-button sdDatetimePickerCancel>Hủy</button>
    <button mat-flat-button sdDatetimePickerApply>Xác nhận</button>
  </sd-datetime-picker-actions>
</sd-datetime-picker>
```

Add `SdDatetimePickerActions`, `SdDatetimePickerNow`, `SdDatetimePickerCancel`, `SdDatetimePickerApply` to your component imports only when projecting custom actions.

---

### With seconds + step minute

```html
<sd-datetime-picker #picker [showSeconds]="true" [stepMinute]="5"></sd-datetime-picker>
```

---

### Min / max constraints

```html
<sd-datetime-picker
  #picker
  [minDate]="today"
  [maxDate]="endOfMonth">
</sd-datetime-picker>
```

---

### Reactive form validation

```ts
ctrl = new FormControl<Date | null>(null, Validators.required);
```

```html
<mat-form-field>
  <input matInput [sdDatetimePicker]="picker" [formControl]="ctrl">
  <button matSuffix [sdDatetimePickerToggle]="picker">Open</button>
  <sd-datetime-picker #picker></sd-datetime-picker>
  @if (ctrl.invalid && ctrl.touched) {
    <mat-error>Required</mat-error>
  }
</mat-form-field>
```

See [the live demo](https://sdcorejs.github.io/angular-material-datetime/) for 9 working examples plus copy-pastable source.

---

## 🧩 Packages

| Package | Purpose | Status |
|---|---|---|
| `@sdcorejs/angular-material-datetime` | Core components + directives + native date adapter | v1 ✅ |
| `@sdcorejs/angular-material-datetime-moment` | Moment.js date adapter | v1.x planned |
| `@sdcorejs/angular-material-datetime-date-fns` | date-fns date adapter | v1.x planned |

All packages publish lockstep with the same version. The Moment and date-fns adapters ship as version-aligned placeholders at v1.0 — their implementations land in subsequent minor releases.

---

## 🎨 Theming — Material 3

The library requires an Angular Material 3 theme. Define your application theme with `mat.theme(...)` so the picker can read system variables such as `--mat-sys-surface-container`, `--mat-sys-primary`, and `--mat-sys-outline-variant`. These variables keep the picker aligned with your palette and dark mode.

```scss
@use '@angular/material' as mat;

html {
  @include mat.theme((
    color: mat.$violet-palette,
    typography: Roboto,
    density: 0,
  ));
}
```

### Migrating an existing theme

If your application uses an earlier Angular Material theming API, migrate the application theme to `mat.theme(...)` before adopting this package version. The datetime picker expects Material 3 system variables and does not provide a compatibility styling layer for older theme definitions.

---

## 🏗 Build

```bash
npm install --legacy-peer-deps
npm run build:all
```

Outputs `dist/datetime/`, `dist/moment-adapter/`, `dist/date-fns-adapter/` (FESM2022 + `.d.ts`).

---

## 🧪 Testing

```bash
npm test
npm run test:coverage
```

Powered by Jest + jest-preset-angular. Coverage thresholds: 80% global, 95% native adapter directory.

---

## 🚀 Publishing

This repo uses [Changesets](https://github.com/changesets/changesets) + a GitHub Actions workflow. Day-to-day flow:

1. Make changes on a feature branch.
2. Add a changeset describing what changed:
   ```bash
   npx changeset
   ```
3. Commit the generated `.changeset/*.md` alongside your code change.
4. Open a PR into `main`.

When the PR merges, the **Release** workflow:
- If unreleased changesets exist → opens a "Version Packages" PR that bumps versions + updates CHANGELOG.
- When that PR is merged → publishes the affected packages to npm and creates the matching git tags.

Requirements:
- `NPM_TOKEN` repository secret (already configured)
- Member of the `@sdcorejs` npm org with publish access

---

## 📐 Compatibility

| Angular | `@sdcorejs/angular-material-datetime` |
|---|---|
| 19.x | 1.x |
| 20.x | 1.x |
| 21.x | 1.x |

Material 19+, CDK 19+, rxjs 7+.

---

## 🎯 Philosophy

`@sdcorejs/angular-material-datetime` is designed around:

* Material-idiomatic API (extends, not replaces, the Material datepicker family)
* Standalone-only — zero NgModule, zero migration friction
* Signal-driven internals — predictable change detection, no Zone.js coupling
* Adapter-pluggable — your date library, your choice
* Sensible defaults — works out of the box, customizable when you need it
* AI-friendly contracts — semantic naming, explicit types, copy-pastable examples

---

## 🌐 Ecosystem

* [`@sdcorejs/utils`](https://www.npmjs.com/package/@sdcorejs/utils) — TypeScript utilities
* [`@sdcorejs/angular-material-datetime`](https://www.npmjs.com/package/@sdcorejs/angular-material-datetime) — this package

---

## 📄 License

[MIT](./LICENSE) — Copyright (c) 2026 Trần Thuận Nghĩa and contributors
