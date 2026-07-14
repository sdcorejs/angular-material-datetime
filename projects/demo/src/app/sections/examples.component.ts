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
  CUSTOM_ACTIONS_TPL, CUSTOM_ACTIONS_TS,
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
              <mat-card-subtitle>Minimal datetime picker — default Now / Cancel / Apply actions</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="example-live">
                <mat-form-field appearance="outline" class="example-field">
                  <mat-label>Pick a datetime</mat-label>
                  <input matInput [sdDatetimePicker]="picker1" [formControl]="basic">
                  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker1">
                    <mat-icon>event</mat-icon>
                  </button>
                  <sd-datetime-picker #picker1></sd-datetime-picker>
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

          <!-- 9. Custom actions -->
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title>9. Custom Actions</mat-card-title>
              <mat-card-subtitle>Override the default Now/Cancel/Apply by projecting your own &lt;sd-datetime-picker-actions&gt; block</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="example-live">
                <mat-form-field appearance="outline" class="example-field">
                  <mat-label>Chọn ngày giờ</mat-label>
                  <input matInput [sdDatetimePicker]="picker9" [formControl]="customActions">
                  <button matSuffix mat-icon-button [sdDatetimePickerToggle]="picker9">
                    <mat-icon>event</mat-icon>
                  </button>
                  <sd-datetime-picker #picker9>
                    <sd-datetime-picker-actions>
                      <button mat-button sdDatetimePickerNow>
                        <mat-icon>schedule</mat-icon> Bây giờ
                      </button>
                      <button mat-button sdDatetimePickerCancel>Hủy</button>
                      <button mat-flat-button sdDatetimePickerApply>Xác nhận</button>
                    </sd-datetime-picker-actions>
                  </sd-datetime-picker>
                </mat-form-field>
                <p class="value-display">Value: <code>{{ customActions.value | date:'medium' }}</code></p>
              </div>
              <mat-expansion-panel class="example-code-panel">
                <mat-expansion-panel-header>
                  <mat-panel-title>Show code</mat-panel-title>
                </mat-expansion-panel-header>
                <app-code [source]="customActionsTpl" lang="html"></app-code>
                <app-code [source]="customActionsTs" lang="typescript"></app-code>
              </mat-expansion-panel>
            </mat-card-content>
          </mat-card>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .section {
      padding: 88px 24px 96px;
      background: var(--mat-sys-surface);
    }

    .section-inner {
      max-width: 1184px;
      margin: 0 auto;
    }

    .section-title {
      margin: 0 0 12px;
      color: var(--mat-sys-on-surface);
      font-size: clamp(32px, 4vw, 46px);
      font-weight: 750;
      letter-spacing: -.025em;
      line-height: 1.12;
    }

    .section-desc {
      max-width: 720px;
      margin: 0 0 48px;
      color: var(--mat-sys-on-surface-variant);
      font-size: 17px;
      line-height: 1.65;
    }

    .examples-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 28px;
    }

    .example-card {
      overflow: hidden;
      border: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 72%, transparent);
      border-radius: 24px !important;
      background: var(--mat-sys-surface-container-lowest) !important;
      box-shadow: var(--mat-sys-level1) !important;
      transition: transform 180ms ease, box-shadow 180ms ease;
    }

    .example-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--mat-sys-level2) !important;
    }

    mat-card-header {
      padding: 24px 24px 0;
    }

    mat-card-title {
      color: var(--mat-sys-on-surface);
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -.01em;
    }

    mat-card-subtitle {
      min-height: 44px;
      margin-top: 6px;
      color: var(--mat-sys-on-surface-variant);
      line-height: 1.5;
    }

    mat-card-content {
      padding: 20px 24px 24px !important;
    }

    .example-live {
      min-height: 156px;
      margin-bottom: 16px;
      padding: 20px;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 18px;
      background: var(--mat-sys-surface-container-low);
    }

    .example-field {
      width: 100%;
    }

    .value-display {
      overflow-wrap: anywhere;
      margin: 10px 0 0;
      color: var(--mat-sys-on-surface-variant);
      font-size: 13px;
    }

    .value-display code {
      padding: 3px 7px;
      border-radius: 7px;
      background: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
      font-size: 12px;
    }

    .example-code-panel {
      margin-top: 4px;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 14px !important;
      background: var(--mat-sys-surface-container-lowest);
      box-shadow: none !important;
    }

    .example-code-panel mat-expansion-panel-header {
      min-height: 48px;
    }

    .example-code-panel ::ng-deep .mat-expansion-panel-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 16px 16px;
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
      padding: 10px 12px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
    }

    .validation-msg.valid {
      background: var(--mat-sys-tertiary-container);
      color: var(--mat-sys-on-tertiary-container);
    }

    .validation-msg.invalid {
      background: var(--mat-sys-error-container);
      color: var(--mat-sys-on-error-container);
    }

    @media (max-width: 900px) {
      .examples-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .section {
        padding: 64px 16px 72px;
      }

      .section-desc {
        margin-bottom: 36px;
        font-size: 16px;
      }

      .examples-grid {
        gap: 20px;
      }

      mat-card-header {
        padding: 20px 18px 0;
      }

      mat-card-subtitle {
        min-height: 0;
      }

      mat-card-content {
        padding: 18px !important;
      }

      .example-live {
        min-height: 0;
        padding: 14px;
      }
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

  // Example 9: Custom actions
  readonly customActions = new FormControl<Date | null>(null);
  readonly customActionsTpl = CUSTOM_ACTIONS_TPL;
  readonly customActionsTs = CUSTOM_ACTIONS_TS;
}
