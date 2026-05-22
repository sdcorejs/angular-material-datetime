export const BASIC_TPL = `<mat-form-field appearance="outline">
  <mat-label>Pick a datetime</mat-label>
  <input matInput [sdDatetimePicker]="picker" [formControl]="ctrl">
  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker">
    <mat-icon>event</mat-icon>
  </button>
  <sd-datetime-picker #picker>
    <sd-datetime-picker-actions>
      <button mat-button sdDatetimePickerNow>
        <mat-icon>schedule</mat-icon> Now
      </button>
      <button mat-button sdDatetimePickerCancel>Cancel</button>
      <button mat-flat-button sdDatetimePickerApply>Apply</button>
    </sd-datetime-picker-actions>
  </sd-datetime-picker>
</mat-form-field>`;

export const BASIC_TS = `import { FormControl } from '@angular/forms';
import {
  SdDatetimePicker, SdDatetimePickerInput, SdDatetimePickerToggle,
  SdDatetimePickerActions, SdDatetimePickerApply, SdDatetimePickerCancel,
  SdDatetimePickerNow,
} from '@sdcorejs/angular-material-datetime';

@Component({ /* ... */ })
export class BasicExample {
  ctrl = new FormControl<Date | null>(null);
}`;

// ─────────────────────────────────────────────────────────────────────────────

export const SECONDS_TPL = `<mat-form-field appearance="outline">
  <mat-label>Pick a datetime (with seconds)</mat-label>
  <input matInput [sdDatetimePicker]="picker" [formControl]="ctrl">
  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker">
    <mat-icon>event</mat-icon>
  </button>
  <sd-datetime-picker #picker [showSeconds]="true">
    <sd-datetime-picker-actions>
      <button mat-button sdDatetimePickerNow>
        <mat-icon>schedule</mat-icon> Now
      </button>
      <button mat-button sdDatetimePickerCancel>Cancel</button>
      <button mat-flat-button sdDatetimePickerApply>Apply</button>
    </sd-datetime-picker-actions>
  </sd-datetime-picker>
</mat-form-field>`;

export const SECONDS_TS = `import { FormControl } from '@angular/forms';

@Component({ /* ... */ })
export class WithSecondsExample {
  ctrl = new FormControl<Date | null>(null);
  // [showSeconds]="true" activates the seconds column in the time spinner
}`;

// ─────────────────────────────────────────────────────────────────────────────

export const MINMAX_TPL = `<mat-form-field appearance="outline">
  <mat-label>Pick a date (Jan–Dec 2026)</mat-label>
  <input matInput [sdDatetimePicker]="picker" [formControl]="ctrl">
  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker">
    <mat-icon>event</mat-icon>
  </button>
  <sd-datetime-picker #picker [minDate]="minDate" [maxDate]="maxDate">
    <sd-datetime-picker-actions>
      <button mat-button sdDatetimePickerCancel>Cancel</button>
      <button mat-flat-button sdDatetimePickerApply>Apply</button>
    </sd-datetime-picker-actions>
  </sd-datetime-picker>
</mat-form-field>`;

export const MINMAX_TS = `import { FormControl } from '@angular/forms';

@Component({ /* ... */ })
export class MinMaxExample {
  ctrl = new FormControl<Date | null>(null);
  minDate = new Date(2026, 0, 1);   // Jan 1 2026
  maxDate = new Date(2026, 11, 31); // Dec 31 2026
}`;

// ─────────────────────────────────────────────────────────────────────────────

export const INITIAL_TPL = `<mat-form-field appearance="outline">
  <mat-label>Pre-filled datetime</mat-label>
  <input matInput [sdDatetimePicker]="picker" [formControl]="ctrl">
  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker">
    <mat-icon>event</mat-icon>
  </button>
  <sd-datetime-picker #picker>
    <sd-datetime-picker-actions>
      <button mat-button sdDatetimePickerCancel>Cancel</button>
      <button mat-flat-button sdDatetimePickerApply>Apply</button>
    </sd-datetime-picker-actions>
  </sd-datetime-picker>
</mat-form-field>`;

export const INITIAL_TS = `import { FormControl } from '@angular/forms';

@Component({ /* ... */ })
export class InitialValueExample {
  // FormControl initialized with a specific Date value
  ctrl = new FormControl<Date | null>(new Date(2026, 4, 22, 14, 30, 0));
}`;

// ─────────────────────────────────────────────────────────────────────────────

export const DISABLED_TPL = `<mat-form-field appearance="outline">
  <mat-label>Disabled datetime picker</mat-label>
  <input matInput [sdDatetimePicker]="picker" [formControl]="ctrl">
  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker">
    <mat-icon>event</mat-icon>
  </button>
  <sd-datetime-picker #picker>
    <sd-datetime-picker-actions>
      <button mat-button sdDatetimePickerCancel>Cancel</button>
      <button mat-flat-button sdDatetimePickerApply>Apply</button>
    </sd-datetime-picker-actions>
  </sd-datetime-picker>
</mat-form-field>

<button mat-stroked-button (click)="toggle()">Toggle disabled</button>`;

export const DISABLED_TS = `import { FormControl } from '@angular/forms';

@Component({ /* ... */ })
export class DisabledExample {
  ctrl = new FormControl<Date | null>({ value: new Date(), disabled: true });

  toggle(): void {
    this.ctrl.disabled ? this.ctrl.enable() : this.ctrl.disable();
  }
}`;

// ─────────────────────────────────────────────────────────────────────────────

export const STEP_TPL = `<mat-form-field appearance="outline">
  <mat-label>Step minute = 5</mat-label>
  <input matInput [sdDatetimePicker]="picker" [formControl]="ctrl">
  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker">
    <mat-icon>event</mat-icon>
  </button>
  <sd-datetime-picker #picker [stepMinute]="5">
    <sd-datetime-picker-actions>
      <button mat-button sdDatetimePickerNow>
        <mat-icon>schedule</mat-icon> Now
      </button>
      <button mat-button sdDatetimePickerCancel>Cancel</button>
      <button mat-flat-button sdDatetimePickerApply>Apply</button>
    </sd-datetime-picker-actions>
  </sd-datetime-picker>
</mat-form-field>`;

export const STEP_TS = `import { FormControl } from '@angular/forms';

@Component({ /* ... */ })
export class StepMinuteExample {
  ctrl = new FormControl<Date | null>(null);
  // [stepMinute]="5" makes the minute spinner jump in 5-unit increments
}`;

// ─────────────────────────────────────────────────────────────────────────────

export const TWO_PICKERS_TPL = `<form [formGroup]="form" class="range-form">
  <mat-form-field appearance="outline">
    <mat-label>Start datetime</mat-label>
    <input matInput [sdDatetimePicker]="startPicker" formControlName="start">
    <button matSuffix mat-icon-button [sdDatetimePickerToggle]="startPicker">
      <mat-icon>event</mat-icon>
    </button>
    <sd-datetime-picker #startPicker>
      <sd-datetime-picker-actions>
        <button mat-button sdDatetimePickerCancel>Cancel</button>
        <button mat-flat-button sdDatetimePickerApply>Apply</button>
      </sd-datetime-picker-actions>
    </sd-datetime-picker>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>End datetime</mat-label>
    <input matInput [sdDatetimePicker]="endPicker" formControlName="end">
    <button matSuffix mat-icon-button [sdDatetimePickerToggle]="endPicker">
      <mat-icon>event</mat-icon>
    </button>
    <sd-datetime-picker #endPicker>
      <sd-datetime-picker-actions>
        <button mat-button sdDatetimePickerCancel>Cancel</button>
        <button mat-flat-button sdDatetimePickerApply>Apply</button>
      </sd-datetime-picker-actions>
    </sd-datetime-picker>
  </mat-form-field>
</form>`;

export const TWO_PICKERS_TS = `import { FormBuilder, FormGroup } from '@angular/forms';

@Component({ /* ... */ })
export class TwoPickersExample {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      start: [null],
      end: [null],
    });
  }
}`;

// ─────────────────────────────────────────────────────────────────────────────

export const VALIDATION_TPL = `<form [formGroup]="form" (ngSubmit)="submit()">
  <mat-form-field appearance="outline">
    <mat-label>Required datetime</mat-label>
    <input matInput [sdDatetimePicker]="picker" formControlName="datetime">
    <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker">
      <mat-icon>event</mat-icon>
    </button>
    <sd-datetime-picker #picker>
      <sd-datetime-picker-actions>
        <button mat-button sdDatetimePickerCancel>Cancel</button>
        <button mat-flat-button sdDatetimePickerApply>Apply</button>
      </sd-datetime-picker-actions>
    </sd-datetime-picker>
    @if (form.get('datetime')?.invalid && form.get('datetime')?.touched) {
      <mat-error>Datetime is required</mat-error>
    }
  </mat-form-field>
  <button mat-flat-button type="submit">Submit</button>
</form>`;

export const VALIDATION_TS = `import { FormBuilder, Validators } from '@angular/forms';

@Component({ /* ... */ })
export class ValidationExample {
  form = this.fb.group({
    datetime: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log('Submitted:', this.form.value);
    }
  }
}`;
