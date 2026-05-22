import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  SdDatetimePicker,
  SdDatetimePickerActions,
  SdDatetimePickerApply,
  SdDatetimePickerCancel,
  SdDatetimePickerInput,
  SdDatetimePickerNow,
  SdDatetimePickerToggle,
} from '@sdcorejs/angular-material-datetime';
import { CodeBlockComponent } from '../code-block.component';
import {
  BASIC_TPL, BASIC_TS,
  DISABLED_TPL, DISABLED_TS,
  INITIAL_TPL, INITIAL_TS,
  MINMAX_TPL, MINMAX_TS,
  SECONDS_TPL, SECONDS_TS,
  STEP_TPL, STEP_TS,
  TWO_PICKERS_TPL, TWO_PICKERS_TS,
  VALIDATION_TPL, VALIDATION_TS,
} from '../examples/source.const';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    SdDatetimePicker,
    SdDatetimePickerInput,
    SdDatetimePickerToggle,
    SdDatetimePickerActions,
    SdDatetimePickerApply,
    SdDatetimePickerCancel,
    SdDatetimePickerNow,
    CodeBlockComponent,
  ],
  template: `
    <section id="examples" class="section">
      <div class="section-inner">
        <h2 class="section-title">Examples</h2>
        <p class="section-desc">Live demos with collapsible source code. Click "Show code" to see the template and component code.</p>

        <div class="examples-grid">

          <!-- 1. Basic -->
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title>1. Basic</mat-card-title>
              <mat-card-subtitle>Minimal datetime picker with Apply/Cancel + Now button</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="example-live">
                <mat-form-field appearance="outline" class="example-field">
                  <mat-label>Pick a datetime</mat-label>
                  <input matInput [sdDatetimePicker]="picker1" [formControl]="basic">
                  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker1">
                    <mat-icon>event</mat-icon>
                  </button>
                  <sd-datetime-picker #picker1>
                    <sd-datetime-picker-actions>
                      <button mat-button sdDatetimePickerNow>
                        <mat-icon>schedule</mat-icon> Now
                      </button>
                      <button mat-button sdDatetimePickerCancel>Cancel</button>
                      <button mat-flat-button sdDatetimePickerApply>Apply</button>
                    </sd-datetime-picker-actions>
                  </sd-datetime-picker>
                </mat-form-field>
                <p class="value-display">Value: <code>{{ basic.value | date:'medium' }}</code></p>
              </div>
              <mat-expansion-panel class="example-code-panel">
                <mat-expansion-panel-header>
                  <mat-panel-title>Show code</mat-panel-title>
                </mat-expansion-panel-header>
                <app-code [source]="basicTpl" lang="html"></app-code>
                <app-code [source]="basicTs" lang="typescript"></app-code>
              </mat-expansion-panel>
            </mat-card-content>
          </mat-card>

          <!-- 2. With seconds -->
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title>2. With Seconds</mat-card-title>
              <mat-card-subtitle>[showSeconds]="true" — HH:MM:SS in the time spinner</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="example-live">
                <mat-form-field appearance="outline" class="example-field">
                  <mat-label>Pick a datetime (with seconds)</mat-label>
                  <input matInput [sdDatetimePicker]="picker2" [formControl]="withSeconds">
                  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker2">
                    <mat-icon>event</mat-icon>
                  </button>
                  <sd-datetime-picker #picker2 [showSeconds]="true">
                    <sd-datetime-picker-actions>
                      <button mat-button sdDatetimePickerNow>
                        <mat-icon>schedule</mat-icon> Now
                      </button>
                      <button mat-button sdDatetimePickerCancel>Cancel</button>
                      <button mat-flat-button sdDatetimePickerApply>Apply</button>
                    </sd-datetime-picker-actions>
                  </sd-datetime-picker>
                </mat-form-field>
                <p class="value-display">Value: <code>{{ withSeconds.value | date:'medium' }}</code></p>
              </div>
              <mat-expansion-panel class="example-code-panel">
                <mat-expansion-panel-header>
                  <mat-panel-title>Show code</mat-panel-title>
                </mat-expansion-panel-header>
                <app-code [source]="secondsTpl" lang="html"></app-code>
                <app-code [source]="secondsTs" lang="typescript"></app-code>
              </mat-expansion-panel>
            </mat-card-content>
          </mat-card>

          <!-- 3. Min/Max constraints -->
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title>3. Min/Max Constraints</mat-card-title>
              <mat-card-subtitle>Restrict selection to Jan 1 – Dec 31 2026</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="example-live">
                <mat-form-field appearance="outline" class="example-field">
                  <mat-label>Pick a date (2026 only)</mat-label>
                  <input matInput [sdDatetimePicker]="picker3" [formControl]="minMax">
                  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker3">
                    <mat-icon>event</mat-icon>
                  </button>
                  <sd-datetime-picker #picker3 [minDate]="minDate" [maxDate]="maxDate">
                    <sd-datetime-picker-actions>
                      <button mat-button sdDatetimePickerCancel>Cancel</button>
                      <button mat-flat-button sdDatetimePickerApply>Apply</button>
                    </sd-datetime-picker-actions>
                  </sd-datetime-picker>
                </mat-form-field>
                <p class="value-display">Value: <code>{{ minMax.value | date:'medium' }}</code></p>
              </div>
              <mat-expansion-panel class="example-code-panel">
                <mat-expansion-panel-header>
                  <mat-panel-title>Show code</mat-panel-title>
                </mat-expansion-panel-header>
                <app-code [source]="minMaxTpl" lang="html"></app-code>
                <app-code [source]="minMaxTs" lang="typescript"></app-code>
              </mat-expansion-panel>
            </mat-card-content>
          </mat-card>

          <!-- 4. Initial value -->
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title>4. Initial Value</mat-card-title>
              <mat-card-subtitle>FormControl initialized with a specific Date</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="example-live">
                <mat-form-field appearance="outline" class="example-field">
                  <mat-label>Pre-filled datetime</mat-label>
                  <input matInput [sdDatetimePicker]="picker4" [formControl]="initialValue">
                  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker4">
                    <mat-icon>event</mat-icon>
                  </button>
                  <sd-datetime-picker #picker4>
                    <sd-datetime-picker-actions>
                      <button mat-button sdDatetimePickerCancel>Cancel</button>
                      <button mat-flat-button sdDatetimePickerApply>Apply</button>
                    </sd-datetime-picker-actions>
                  </sd-datetime-picker>
                </mat-form-field>
                <p class="value-display">Value: <code>{{ initialValue.value | date:'medium' }}</code></p>
              </div>
              <mat-expansion-panel class="example-code-panel">
                <mat-expansion-panel-header>
                  <mat-panel-title>Show code</mat-panel-title>
                </mat-expansion-panel-header>
                <app-code [source]="initialTpl" lang="html"></app-code>
                <app-code [source]="initialTs" lang="typescript"></app-code>
              </mat-expansion-panel>
            </mat-card-content>
          </mat-card>

          <!-- 5. Disabled state -->
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title>5. Disabled State</mat-card-title>
              <mat-card-subtitle>formControl.disable() — input and toggle are both disabled</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="example-live">
                <mat-form-field appearance="outline" class="example-field">
                  <mat-label>Disabled datetime picker</mat-label>
                  <input matInput [sdDatetimePicker]="picker5" [formControl]="disabledCtrl">
                  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker5">
                    <mat-icon>event</mat-icon>
                  </button>
                  <sd-datetime-picker #picker5>
                    <sd-datetime-picker-actions>
                      <button mat-button sdDatetimePickerCancel>Cancel</button>
                      <button mat-flat-button sdDatetimePickerApply>Apply</button>
                    </sd-datetime-picker-actions>
                  </sd-datetime-picker>
                </mat-form-field>
                <button mat-stroked-button (click)="toggleDisabled()" class="toggle-btn">
                  {{ disabledCtrl.disabled ? 'Enable' : 'Disable' }}
                </button>
              </div>
              <mat-expansion-panel class="example-code-panel">
                <mat-expansion-panel-header>
                  <mat-panel-title>Show code</mat-panel-title>
                </mat-expansion-panel-header>
                <app-code [source]="disabledTpl" lang="html"></app-code>
                <app-code [source]="disabledTs" lang="typescript"></app-code>
              </mat-expansion-panel>
            </mat-card-content>
          </mat-card>

          <!-- 6. Step minute = 5 -->
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title>6. Step Minute = 5</mat-card-title>
              <mat-card-subtitle>[stepMinute]="5" — minute spinner jumps in 5-unit increments</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="example-live">
                <mat-form-field appearance="outline" class="example-field">
                  <mat-label>Step minute = 5</mat-label>
                  <input matInput [sdDatetimePicker]="picker6" [formControl]="stepMinute">
                  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker6">
                    <mat-icon>event</mat-icon>
                  </button>
                  <sd-datetime-picker #picker6 [stepMinute]="5">
                    <sd-datetime-picker-actions>
                      <button mat-button sdDatetimePickerNow>
                        <mat-icon>schedule</mat-icon> Now
                      </button>
                      <button mat-button sdDatetimePickerCancel>Cancel</button>
                      <button mat-flat-button sdDatetimePickerApply>Apply</button>
                    </sd-datetime-picker-actions>
                  </sd-datetime-picker>
                </mat-form-field>
                <p class="value-display">Value: <code>{{ stepMinute.value | date:'medium' }}</code></p>
              </div>
              <mat-expansion-panel class="example-code-panel">
                <mat-expansion-panel-header>
                  <mat-panel-title>Show code</mat-panel-title>
                </mat-expansion-panel-header>
                <app-code [source]="stepTpl" lang="html"></app-code>
                <app-code [source]="stepTs" lang="typescript"></app-code>
              </mat-expansion-panel>
            </mat-card-content>
          </mat-card>

          <!-- 7. Two pickers in one form -->
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title>7. Two Pickers in One Form</mat-card-title>
              <mat-card-subtitle>Start + end datetime bound to a single FormGroup</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="example-live">
                <form [formGroup]="rangeForm" class="range-form">
                  <mat-form-field appearance="outline" class="example-field">
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

                  <mat-form-field appearance="outline" class="example-field">
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
                </form>
                <p class="value-display">Start: <code>{{ rangeForm.value.start | date:'medium' }}</code></p>
                <p class="value-display">End: <code>{{ rangeForm.value.end | date:'medium' }}</code></p>
              </div>
              <mat-expansion-panel class="example-code-panel">
                <mat-expansion-panel-header>
                  <mat-panel-title>Show code</mat-panel-title>
                </mat-expansion-panel-header>
                <app-code [source]="twoPickersTpl" lang="html"></app-code>
                <app-code [source]="twoPickersTs" lang="typescript"></app-code>
              </mat-expansion-panel>
            </mat-card-content>
          </mat-card>

          <!-- 8. Reactive form validation -->
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title>8. Reactive Form Validation</mat-card-title>
              <mat-card-subtitle>Validators.required — shows error when touched and invalid</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="example-live">
                <form [formGroup]="validationForm" (ngSubmit)="submitValidation()" class="validation-form">
                  <mat-form-field appearance="outline" class="example-field">
                    <mat-label>Required datetime</mat-label>
                    <input matInput [sdDatetimePicker]="picker8" formControlName="datetime">
                    <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker8">
                      <mat-icon>event</mat-icon>
                    </button>
                    <sd-datetime-picker #picker8>
                      <sd-datetime-picker-actions>
                        <button mat-button sdDatetimePickerCancel>Cancel</button>
                        <button mat-flat-button sdDatetimePickerApply>Apply</button>
                      </sd-datetime-picker-actions>
                    </sd-datetime-picker>
                    @if (validationForm.get('datetime')?.invalid && validationForm.get('datetime')?.touched) {
                      <mat-error>Datetime is required</mat-error>
                    }
                  </mat-form-field>
                  <button mat-flat-button type="submit">Submit</button>
                </form>
                @if (validationSubmitted) {
                  <p class="validation-msg" [class.valid]="validationForm.valid" [class.invalid]="validationForm.invalid">
                    {{ validationForm.valid ? 'Form submitted successfully!' : 'Please fill in all required fields.' }}
                  </p>
                }
              </div>
              <mat-expansion-panel class="example-code-panel">
                <mat-expansion-panel-header>
                  <mat-panel-title>Show code</mat-panel-title>
                </mat-expansion-panel-header>
                <app-code [source]="validationTpl" lang="html"></app-code>
                <app-code [source]="validationTs" lang="typescript"></app-code>
              </mat-expansion-panel>
            </mat-card-content>
          </mat-card>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .section {
      padding: 64px 24px;
    }

    .section-inner {
      max-width: 1120px;
      margin: 0 auto;
    }

    .section-title {
      font-size: 32px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 8px;
    }

    .section-desc {
      font-size: 16px;
      color: #555;
      margin: 0 0 40px;
    }

    .examples-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
      gap: 24px;
    }

    .example-card {
      border-radius: 12px !important;
      box-shadow: 0 2px 8px rgba(0,0,0,.08) !important;
      border: 1px solid #e8eaed;
    }

    mat-card-header {
      padding-bottom: 0;
    }

    mat-card-content {
      padding-top: 16px !important;
    }

    .example-live {
      padding: 16px;
      background: #fafafa;
      border-radius: 8px;
      margin-bottom: 12px;
      border: 1px dashed #ddd;
    }

    .example-field {
      width: 100%;
    }

    .value-display {
      margin: 8px 0 0;
      font-size: 13px;
      color: #666;
    }

    .value-display code {
      background: #f1f3f4;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
    }

    .example-code-panel {
      margin-top: 4px;
    }

    .example-code-panel ::ng-deep .mat-expansion-panel-body {
      padding: 12px 0 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .range-form {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .toggle-btn {
      margin-top: 8px;
    }

    .validation-form {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .validation-msg {
      margin: 8px 0 0;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
    }

    .validation-msg.valid { background: #e8f5e9; color: #2e7d32; }
    .validation-msg.invalid { background: #fce4ec; color: #c62828; }

    @media (max-width: 768px) {
      .examples-grid { grid-template-columns: 1fr; }
      .section { padding: 40px 16px; }
      .section-title { font-size: 24px; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesComponent {
  // Example 1: Basic
  readonly basic = new FormControl<Date | null>(null);
  readonly basicTpl = BASIC_TPL;
  readonly basicTs = BASIC_TS;

  // Example 2: With seconds
  readonly withSeconds = new FormControl<Date | null>(null);
  readonly secondsTpl = SECONDS_TPL;
  readonly secondsTs = SECONDS_TS;

  // Example 3: Min/Max constraints
  readonly minMax = new FormControl<Date | null>(null);
  readonly minDate = new Date(2026, 0, 1);
  readonly maxDate = new Date(2026, 11, 31);
  readonly minMaxTpl = MINMAX_TPL;
  readonly minMaxTs = MINMAX_TS;

  // Example 4: Initial value
  readonly initialValue = new FormControl<Date | null>(new Date(2026, 4, 22, 14, 30, 0));
  readonly initialTpl = INITIAL_TPL;
  readonly initialTs = INITIAL_TS;

  // Example 5: Disabled
  readonly disabledCtrl = new FormControl<Date | null>({ value: new Date(2026, 4, 22, 9, 0, 0), disabled: true });
  readonly disabledTpl = DISABLED_TPL;
  readonly disabledTs = DISABLED_TS;

  toggleDisabled(): void {
    if (this.disabledCtrl.disabled) {
      this.disabledCtrl.enable();
    } else {
      this.disabledCtrl.disable();
    }
  }

  // Example 6: Step minute
  readonly stepMinute = new FormControl<Date | null>(null);
  readonly stepTpl = STEP_TPL;
  readonly stepTs = STEP_TS;

  // Example 7: Two pickers
  readonly rangeForm = new FormBuilder().group({
    start: [null as Date | null],
    end: [null as Date | null],
  });
  readonly twoPickersTpl = TWO_PICKERS_TPL;
  readonly twoPickersTs = TWO_PICKERS_TS;

  // Example 8: Validation
  readonly validationForm = new FormBuilder().group({
    datetime: [null as Date | null, Validators.required],
  });
  readonly validationTpl = VALIDATION_TPL;
  readonly validationTs = VALIDATION_TS;
  validationSubmitted = false;

  submitValidation(): void {
    this.validationForm.markAllAsTouched();
    this.validationSubmitted = true;
  }
}
