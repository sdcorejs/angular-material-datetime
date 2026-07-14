import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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

type ExampleIntent = 'quick-start' | 'forms-validation' | 'customization' | 'composition';
type ExampleId =
  | 'basic'
  | 'initial-value'
  | 'required'
  | 'min-max'
  | 'disabled'
  | 'seconds'
  | 'minute-step'
  | 'custom-actions'
  | 'two-pickers';

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
        <p class="section-eyebrow">Live examples</p>
        <h2 class="section-title">Start with the path you need</h2>
        <p class="section-desc">Choose a developer intent, then run the example and inspect its complete template and component source.</p>

        <div class="intent-controls" role="group" aria-label="Example intent">
          <button type="button" mat-stroked-button aria-controls="featured-example" [attr.aria-pressed]="selectedIntent() === 'quick-start'" (click)="selectIntent('quick-start')">
            Quick start <span>2</span>
          </button>
          <button type="button" mat-stroked-button aria-controls="featured-example" [attr.aria-pressed]="selectedIntent() === 'forms-validation'" (click)="selectIntent('forms-validation')">
            Forms &amp; validation <span>3</span>
          </button>
          <button type="button" mat-stroked-button aria-controls="featured-example" [attr.aria-pressed]="selectedIntent() === 'customization'" (click)="selectIntent('customization')">
            Customization <span>3</span>
          </button>
          <button type="button" mat-stroked-button aria-controls="featured-example" [attr.aria-pressed]="selectedIntent() === 'composition'" (click)="selectIntent('composition')">
            Composition <span>1</span>
          </button>
        </div>

        <mat-card id="featured-example" class="featured-example">
          @switch (selectedExample()) {
            @case ('basic') {
              <article data-example-demo="basic" aria-labelledby="featured-basic-title">
                <header class="featured-header"><p>Quick start</p><h3 id="featured-basic-title">Basic</h3><span>Minimal picker with built-in Now, Cancel, and Apply actions.</span></header>
                <div class="workbench">
                  <div class="example-live">
                    <mat-form-field appearance="outline" class="example-field">
                      <mat-label>Pick a datetime</mat-label>
                      <input matInput [sdDatetimePicker]="basicPicker" [formControl]="basic">
                      <button matSuffix mat-icon-button [sdDatetimePickerToggle]="basicPicker" aria-label="Open basic datetime picker"><mat-icon>event</mat-icon></button>
                      <sd-datetime-picker #basicPicker></sd-datetime-picker>
                    </mat-form-field>
                    <p class="value-display">Value: <code>{{ basic.value | date:'medium' }}</code></p>
                  </div>
                  <div class="source-pane"><mat-expansion-panel class="example-code-panel"><mat-expansion-panel-header><mat-panel-title>Show source</mat-panel-title></mat-expansion-panel-header><app-code [source]="basicTpl" lang="html"></app-code><app-code [source]="basicTs" lang="typescript"></app-code></mat-expansion-panel></div>
                </div>
              </article>
            }
            @case ('initial-value') {
              <article data-example-demo="initial-value" aria-labelledby="featured-initial-title">
                <header class="featured-header"><p>Quick start</p><h3 id="featured-initial-title">Initial value</h3><span>Initialize the FormControl with a specific Date.</span></header>
                <div class="workbench">
                  <div class="example-live">
                    <mat-form-field appearance="outline" class="example-field">
                      <mat-label>Pre-filled datetime</mat-label>
                      <input matInput [sdDatetimePicker]="initialPicker" [formControl]="initialValue">
                      <button matSuffix mat-icon-button [sdDatetimePickerToggle]="initialPicker" aria-label="Open pre-filled datetime picker"><mat-icon>event</mat-icon></button>
                      <sd-datetime-picker #initialPicker><sd-datetime-picker-actions><button mat-button sdDatetimePickerCancel>Cancel</button><button mat-flat-button sdDatetimePickerApply>Apply</button></sd-datetime-picker-actions></sd-datetime-picker>
                    </mat-form-field>
                    <p class="value-display">Value: <code>{{ initialValue.value | date:'medium' }}</code></p>
                  </div>
                  <div class="source-pane"><mat-expansion-panel class="example-code-panel"><mat-expansion-panel-header><mat-panel-title>Show source</mat-panel-title></mat-expansion-panel-header><app-code [source]="initialTpl" lang="html"></app-code><app-code [source]="initialTs" lang="typescript"></app-code></mat-expansion-panel></div>
                </div>
              </article>
            }
            @case ('required') {
              <article data-example-demo="required" aria-labelledby="featured-required-title">
                <header class="featured-header"><p>Forms &amp; validation</p><h3 id="featured-required-title">Required validation</h3><span>Pair Validators.required with explicit invalid and success feedback.</span></header>
                <div class="workbench">
                  <div class="example-live">
                    <form [formGroup]="validationForm" (ngSubmit)="submitValidation()" class="validation-form">
                      <mat-form-field appearance="outline" class="example-field">
                        <mat-label>Required datetime</mat-label>
                        <input matInput [sdDatetimePicker]="requiredPicker" formControlName="datetime">
                        <button matSuffix mat-icon-button [sdDatetimePickerToggle]="requiredPicker" aria-label="Open required datetime picker"><mat-icon>event</mat-icon></button>
                        <sd-datetime-picker #requiredPicker><sd-datetime-picker-actions><button mat-button sdDatetimePickerCancel>Cancel</button><button mat-flat-button sdDatetimePickerApply>Apply</button></sd-datetime-picker-actions></sd-datetime-picker>
                        @if (validationDatetime.invalid && validationDatetime.touched) { <mat-error>Datetime is required</mat-error> }
                      </mat-form-field>
                      <button mat-flat-button type="submit">Submit</button>
                    </form>
                    @if (validationSubmitted()) {
                      <p class="validation-msg" [class.valid]="validationForm.valid" [class.invalid]="validationForm.invalid">{{ validationForm.valid ? 'Form submitted successfully!' : 'Please fill in all required fields.' }}</p>
                    }
                  </div>
                  <div class="source-pane"><mat-expansion-panel class="example-code-panel"><mat-expansion-panel-header><mat-panel-title>Show source</mat-panel-title></mat-expansion-panel-header><app-code [source]="validationTpl" lang="html"></app-code><app-code [source]="validationTs" lang="typescript"></app-code></mat-expansion-panel></div>
                </div>
              </article>
            }
            @case ('min-max') {
              <article data-example-demo="min-max" aria-labelledby="featured-min-max-title">
                <header class="featured-header"><p>Forms &amp; validation</p><h3 id="featured-min-max-title">Min / max constraints</h3><span>Restrict selection to January 1 through December 31, 2026.</span></header>
                <div class="workbench">
                  <div class="example-live">
                    <mat-form-field appearance="outline" class="example-field">
                      <mat-label>Pick a date in 2026</mat-label>
                      <input matInput [sdDatetimePicker]="minMaxPicker" [formControl]="minMax">
                      <button matSuffix mat-icon-button [sdDatetimePickerToggle]="minMaxPicker" aria-label="Open constrained datetime picker"><mat-icon>event</mat-icon></button>
                      <sd-datetime-picker #minMaxPicker [minDate]="minDate" [maxDate]="maxDate"><sd-datetime-picker-actions><button mat-button sdDatetimePickerCancel>Cancel</button><button mat-flat-button sdDatetimePickerApply>Apply</button></sd-datetime-picker-actions></sd-datetime-picker>
                    </mat-form-field>
                    <p class="value-display">Value: <code>{{ minMax.value | date:'medium' }}</code></p>
                  </div>
                  <div class="source-pane"><mat-expansion-panel class="example-code-panel"><mat-expansion-panel-header><mat-panel-title>Show source</mat-panel-title></mat-expansion-panel-header><app-code [source]="minMaxTpl" lang="html"></app-code><app-code [source]="minMaxTs" lang="typescript"></app-code></mat-expansion-panel></div>
                </div>
              </article>
            }
            @case ('disabled') {
              <article data-example-demo="disabled" aria-labelledby="featured-disabled-title">
                <header class="featured-header"><p>Forms &amp; validation</p><h3 id="featured-disabled-title">Disabled state</h3><span>Disable the input, toggle, and picker from the FormControl.</span></header>
                <div class="workbench">
                  <div class="example-live">
                    <mat-form-field appearance="outline" class="example-field">
                      <mat-label>Disabled datetime picker</mat-label>
                      <input matInput [sdDatetimePicker]="disabledPicker" [formControl]="disabledCtrl">
                      <button matSuffix mat-icon-button [sdDatetimePickerToggle]="disabledPicker" aria-label="Open disabled-state datetime picker"><mat-icon>event</mat-icon></button>
                      <sd-datetime-picker #disabledPicker><sd-datetime-picker-actions><button mat-button sdDatetimePickerCancel>Cancel</button><button mat-flat-button sdDatetimePickerApply>Apply</button></sd-datetime-picker-actions></sd-datetime-picker>
                    </mat-form-field>
                    <button mat-stroked-button type="button" (click)="toggleDisabled()" class="toggle-btn">{{ disabledCtrl.disabled ? 'Enable example' : 'Disable example' }}</button>
                  </div>
                  <div class="source-pane"><mat-expansion-panel class="example-code-panel"><mat-expansion-panel-header><mat-panel-title>Show source</mat-panel-title></mat-expansion-panel-header><app-code [source]="disabledTpl" lang="html"></app-code><app-code [source]="disabledTs" lang="typescript"></app-code></mat-expansion-panel></div>
                </div>
              </article>
            }
            @case ('seconds') {
              <article data-example-demo="seconds" aria-labelledby="featured-seconds-title">
                <header class="featured-header"><p>Customization</p><h3 id="featured-seconds-title">Seconds</h3><span>Expose HH:MM:SS controls with showSeconds.</span></header>
                <div class="workbench">
                  <div class="example-live">
                    <mat-form-field appearance="outline" class="example-field">
                      <mat-label>Pick a datetime with seconds</mat-label>
                      <input matInput [sdDatetimePicker]="secondsPicker" [formControl]="withSeconds">
                      <button matSuffix mat-icon-button [sdDatetimePickerToggle]="secondsPicker" aria-label="Open datetime picker with seconds"><mat-icon>event</mat-icon></button>
                      <sd-datetime-picker #secondsPicker [showSeconds]="true"><sd-datetime-picker-actions><button mat-button sdDatetimePickerNow><mat-icon>schedule</mat-icon> Now</button><button mat-button sdDatetimePickerCancel>Cancel</button><button mat-flat-button sdDatetimePickerApply>Apply</button></sd-datetime-picker-actions></sd-datetime-picker>
                    </mat-form-field>
                    <p class="value-display">Value: <code>{{ withSeconds.value | date:'medium' }}</code></p>
                  </div>
                  <div class="source-pane"><mat-expansion-panel class="example-code-panel"><mat-expansion-panel-header><mat-panel-title>Show source</mat-panel-title></mat-expansion-panel-header><app-code [source]="secondsTpl" lang="html"></app-code><app-code [source]="secondsTs" lang="typescript"></app-code></mat-expansion-panel></div>
                </div>
              </article>
            }
            @case ('minute-step') {
              <article data-example-demo="minute-step" aria-labelledby="featured-minute-step-title">
                <header class="featured-header"><p>Customization</p><h3 id="featured-minute-step-title">Minute step</h3><span>Move through minutes in five-unit increments.</span></header>
                <div class="workbench">
                  <div class="example-live">
                    <mat-form-field appearance="outline" class="example-field">
                      <mat-label>Five-minute increments</mat-label>
                      <input matInput [sdDatetimePicker]="stepPicker" [formControl]="stepMinute">
                      <button matSuffix mat-icon-button [sdDatetimePickerToggle]="stepPicker" aria-label="Open five-minute-step datetime picker"><mat-icon>event</mat-icon></button>
                      <sd-datetime-picker #stepPicker [stepMinute]="5"><sd-datetime-picker-actions><button mat-button sdDatetimePickerNow><mat-icon>schedule</mat-icon> Now</button><button mat-button sdDatetimePickerCancel>Cancel</button><button mat-flat-button sdDatetimePickerApply>Apply</button></sd-datetime-picker-actions></sd-datetime-picker>
                    </mat-form-field>
                    <p class="value-display">Value: <code>{{ stepMinute.value | date:'medium' }}</code></p>
                  </div>
                  <div class="source-pane"><mat-expansion-panel class="example-code-panel"><mat-expansion-panel-header><mat-panel-title>Show source</mat-panel-title></mat-expansion-panel-header><app-code [source]="stepTpl" lang="html"></app-code><app-code [source]="stepTs" lang="typescript"></app-code></mat-expansion-panel></div>
                </div>
              </article>
            }
            @case ('custom-actions') {
              <article data-example-demo="custom-actions" aria-labelledby="featured-custom-actions-title">
                <header class="featured-header"><p>Customization</p><h3 id="featured-custom-actions-title">Custom actions</h3><span>Replace the default action row with projected localized content.</span></header>
                <div class="workbench">
                  <div class="example-live">
                    <mat-form-field appearance="outline" class="example-field">
                      <mat-label>Chọn ngày giờ</mat-label>
                      <input matInput [sdDatetimePicker]="customActionsPicker" [formControl]="customActions">
                      <button matSuffix mat-icon-button [sdDatetimePickerToggle]="customActionsPicker" aria-label="Mở bộ chọn ngày giờ"><mat-icon>event</mat-icon></button>
                      <sd-datetime-picker #customActionsPicker><sd-datetime-picker-actions><button mat-button sdDatetimePickerNow><mat-icon>schedule</mat-icon> Bây giờ</button><button mat-button sdDatetimePickerCancel>Hủy</button><button mat-flat-button sdDatetimePickerApply>Xác nhận</button></sd-datetime-picker-actions></sd-datetime-picker>
                    </mat-form-field>
                    <p class="value-display">Value: <code>{{ customActions.value | date:'medium' }}</code></p>
                  </div>
                  <div class="source-pane"><mat-expansion-panel class="example-code-panel"><mat-expansion-panel-header><mat-panel-title>Show source</mat-panel-title></mat-expansion-panel-header><app-code [source]="customActionsTpl" lang="html"></app-code><app-code [source]="customActionsTs" lang="typescript"></app-code></mat-expansion-panel></div>
                </div>
              </article>
            }
            @case ('two-pickers') {
              <article data-example-demo="two-pickers" aria-labelledby="featured-two-pickers-title">
                <header class="featured-header"><p>Composition</p><h3 id="featured-two-pickers-title">Two pickers in one form</h3><span>Bind start and end values to one FormGroup.</span></header>
                <div class="workbench">
                  <div class="example-live">
                    <form [formGroup]="rangeForm" class="range-form">
                      <mat-form-field appearance="outline" class="example-field">
                        <mat-label>Start datetime</mat-label>
                        <input matInput [sdDatetimePicker]="startPicker" formControlName="start">
                        <button matSuffix mat-icon-button [sdDatetimePickerToggle]="startPicker" aria-label="Open start datetime picker"><mat-icon>event</mat-icon></button>
                        <sd-datetime-picker #startPicker><sd-datetime-picker-actions><button mat-button sdDatetimePickerCancel>Cancel</button><button mat-flat-button sdDatetimePickerApply>Apply</button></sd-datetime-picker-actions></sd-datetime-picker>
                      </mat-form-field>
                      <mat-form-field appearance="outline" class="example-field">
                        <mat-label>End datetime</mat-label>
                        <input matInput [sdDatetimePicker]="endPicker" formControlName="end">
                        <button matSuffix mat-icon-button [sdDatetimePickerToggle]="endPicker" aria-label="Open end datetime picker"><mat-icon>event</mat-icon></button>
                        <sd-datetime-picker #endPicker><sd-datetime-picker-actions><button mat-button sdDatetimePickerCancel>Cancel</button><button mat-flat-button sdDatetimePickerApply>Apply</button></sd-datetime-picker-actions></sd-datetime-picker>
                      </mat-form-field>
                    </form>
                    <p class="value-display">Start: <code>{{ rangeForm.value.start | date:'medium' }}</code></p>
                    <p class="value-display">End: <code>{{ rangeForm.value.end | date:'medium' }}</code></p>
                  </div>
                  <div class="source-pane"><mat-expansion-panel class="example-code-panel"><mat-expansion-panel-header><mat-panel-title>Show source</mat-panel-title></mat-expansion-panel-header><app-code [source]="twoPickersTpl" lang="html"></app-code><app-code [source]="twoPickersTs" lang="typescript"></app-code></mat-expansion-panel></div>
                </div>
              </article>
            }
          }
        </mat-card>

        <div class="example-index" aria-label="Available examples">
          <section class="intent-group" aria-labelledby="quick-start-heading">
            <h3 id="quick-start-heading">Quick start</h3>
            <p>Smallest useful setup and deterministic initialization.</p>
            <div class="choice-list">
              <button id="example-basic" type="button" class="example-choice" aria-controls="featured-example" [attr.aria-pressed]="selectedExample() === 'basic'" (click)="selectExample('basic', 'quick-start')">
                <span><strong>Basic</strong><small>Default actions and a nullable control</small></span>
                @if (selectedExample() === 'basic') { <mat-icon aria-hidden="true">check_circle</mat-icon> }
              </button>
              <button id="example-initial-value" type="button" class="example-choice" aria-controls="featured-example" [attr.aria-pressed]="selectedExample() === 'initial-value'" (click)="selectExample('initial-value', 'quick-start')">
                <span><strong>Initial value</strong><small>Start from a specific Date</small></span>
                @if (selectedExample() === 'initial-value') { <mat-icon aria-hidden="true">check_circle</mat-icon> }
              </button>
            </div>
          </section>

          <section class="intent-group" aria-labelledby="forms-validation-heading">
            <h3 id="forms-validation-heading">Forms &amp; validation</h3>
            <p>Required, bounded, and disabled control states.</p>
            <div class="choice-list">
              <button id="example-required" type="button" class="example-choice" aria-controls="featured-example" [attr.aria-pressed]="selectedExample() === 'required'" (click)="selectExample('required', 'forms-validation')">
                <span><strong>Required</strong><small>Reactive form validation</small></span>
                @if (selectedExample() === 'required') { <mat-icon aria-hidden="true">check_circle</mat-icon> }
              </button>
              <button id="example-min-max" type="button" class="example-choice" aria-controls="featured-example" [attr.aria-pressed]="selectedExample() === 'min-max'" (click)="selectExample('min-max', 'forms-validation')">
                <span><strong>Min / max</strong><small>Restrict the selectable range</small></span>
                @if (selectedExample() === 'min-max') { <mat-icon aria-hidden="true">check_circle</mat-icon> }
              </button>
              <button id="example-disabled" type="button" class="example-choice" aria-controls="featured-example" [attr.aria-pressed]="selectedExample() === 'disabled'" (click)="selectExample('disabled', 'forms-validation')">
                <span><strong>Disabled</strong><small>Toggle the complete control state</small></span>
                @if (selectedExample() === 'disabled') { <mat-icon aria-hidden="true">check_circle</mat-icon> }
              </button>
            </div>
          </section>

          <section class="intent-group" aria-labelledby="customization-heading">
            <h3 id="customization-heading">Customization</h3>
            <p>Time precision, increments, and projected actions.</p>
            <div class="choice-list">
              <button id="example-seconds" type="button" class="example-choice" aria-controls="featured-example" [attr.aria-pressed]="selectedExample() === 'seconds'" (click)="selectExample('seconds', 'customization')">
                <span><strong>Seconds</strong><small>Use an HH:MM:SS spinner</small></span>
                @if (selectedExample() === 'seconds') { <mat-icon aria-hidden="true">check_circle</mat-icon> }
              </button>
              <button id="example-minute-step" type="button" class="example-choice" aria-controls="featured-example" [attr.aria-pressed]="selectedExample() === 'minute-step'" (click)="selectExample('minute-step', 'customization')">
                <span><strong>Minute step</strong><small>Increment minutes by five</small></span>
                @if (selectedExample() === 'minute-step') { <mat-icon aria-hidden="true">check_circle</mat-icon> }
              </button>
              <button id="example-custom-actions" type="button" class="example-choice" aria-controls="featured-example" [attr.aria-pressed]="selectedExample() === 'custom-actions'" (click)="selectExample('custom-actions', 'customization')">
                <span><strong>Custom actions</strong><small>Project localized action labels</small></span>
                @if (selectedExample() === 'custom-actions') { <mat-icon aria-hidden="true">check_circle</mat-icon> }
              </button>
            </div>
          </section>

          <section class="intent-group" aria-labelledby="composition-heading">
            <h3 id="composition-heading">Composition</h3>
            <p>Coordinate multiple pickers in one reactive form.</p>
            <div class="choice-list">
              <button id="example-two-pickers" type="button" class="example-choice" aria-controls="featured-example" [attr.aria-pressed]="selectedExample() === 'two-pickers'" (click)="selectExample('two-pickers', 'composition')">
                <span><strong>Two pickers</strong><small>Start and end in one FormGroup</small></span>
                @if (selectedExample() === 'two-pickers') { <mat-icon aria-hidden="true">check_circle</mat-icon> }
              </button>
            </div>
          </section>
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
      margin: 0 0 32px;
      color: var(--mat-sys-on-surface-variant);
      font-size: 17px;
      line-height: 1.65;
    }

    .section-eyebrow {
      margin: 0 0 10px;
      color: var(--mat-sys-primary);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .1em;
      text-transform: uppercase;
    }

    .featured-example {
      display: block;
      min-width: 0;
      overflow: hidden;
      border: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 78%, transparent);
      border-radius: 28px !important;
      background: var(--mat-sys-surface-container-lowest) !important;
      box-shadow: var(--mat-sys-level2) !important;
      scroll-margin-top: 88px;
      margin-bottom: 32px;
    }

    .featured-header {
      padding: 28px 28px 22px;
      border-bottom: 1px solid var(--mat-sys-outline-variant);
      background: var(--mat-sys-surface-container-low);
    }

    .featured-header p {
      margin: 0 0 5px;
      color: var(--mat-sys-primary);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: .08em;
      text-transform: uppercase;
    }

    .featured-header h3 {
      margin: 0 0 6px;
      color: var(--mat-sys-on-surface);
      font-size: clamp(24px, 3vw, 32px);
      font-weight: 750;
      letter-spacing: -.02em;
    }

    .featured-header span {
      color: var(--mat-sys-on-surface-variant);
      line-height: 1.55;
    }

    .workbench {
      display: grid;
      min-width: 0;
      grid-template-columns: minmax(280px, .85fr) minmax(0, 1.15fr);
    }

    .example-live {
      min-width: 0;
      padding: 32px 28px;
      background: var(--mat-sys-surface-container-lowest);
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

    .source-pane {
      min-width: 0;
      overflow: hidden;
      padding: 28px;
      border-left: 1px solid var(--mat-sys-outline-variant);
      background: var(--mat-sys-surface-container-low);
    }

    .example-code-panel {
      width: 100%;
      min-width: 0;
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
      min-width: 0;
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
      .workbench {
        grid-template-columns: 1fr;
      }

      .source-pane {
        border-top: 1px solid var(--mat-sys-outline-variant);
        border-left: 0;
      }
    }

    @media (max-width: 600px) {
      .section {
        padding: 64px 16px 72px;
      }

      .section-desc {
        margin-bottom: 24px;
        font-size: 16px;
      }

      .featured-example {
        border-radius: 20px !important;
      }

      .featured-header {
        padding: 22px 18px 18px;
      }

      .example-live,
      .source-pane {
        padding: 20px 18px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesComponent {
  readonly selectedIntent = signal<ExampleIntent>('quick-start');
  readonly selectedExample = signal<ExampleId>('basic');

  selectIntent(intent: ExampleIntent): void {
    const firstExample: Record<ExampleIntent, ExampleId> = {
      'quick-start': 'basic',
      'forms-validation': 'required',
      'customization': 'seconds',
      'composition': 'two-pickers',
    };

    this.selectedIntent.set(intent);
    this.selectedExample.set(firstExample[intent]);
  }

  selectExample(example: ExampleId, intent: ExampleIntent): void {
    this.selectedIntent.set(intent);
    this.selectedExample.set(example);
    const featured = document.getElementById('featured-example');
    if (typeof featured?.scrollIntoView !== 'function') return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    featured.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

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
  readonly validationDatetime = this.validationForm.controls.datetime;
  readonly validationTpl = VALIDATION_TPL;
  readonly validationTs = VALIDATION_TS;
  readonly validationSubmitted = signal(false);

  submitValidation(): void {
    this.validationForm.markAllAsTouched();
    this.validationSubmitted.set(true);
  }

  // Example 9: Custom actions
  readonly customActions = new FormControl<Date | null>(null);
  readonly customActionsTpl = CUSTOM_ACTIONS_TPL;
  readonly customActionsTs = CUSTOM_ACTIONS_TS;
}
