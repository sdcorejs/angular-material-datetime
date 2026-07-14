import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCalendar } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  SdDatetimePicker,
  SdDatetimePickerInput,
  SdDatetimePickerToggle,
  SdTimeSpinner,
} from '@sdcorejs/angular-material-datetime';
import { CodeBlockComponent } from '../code-block.component';

const INITIAL_PREVIEW_VALUE = new Date(2026, 6, 14, 10, 30, 0);

function cloneDate(value: Date): Date {
  return new Date(value.getTime());
}

function formatLocalDatetime(value: Date): string {
  const pad = (part: number): string => String(part).padStart(2, '0');
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}T${pad(value.getHours())}:${pad(value.getMinutes())}`;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatCalendar,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    SdDatetimePicker,
    SdDatetimePickerInput,
    SdDatetimePickerToggle,
    SdTimeSpinner,
    CodeBlockComponent,
  ],
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="hero-eyebrow">Angular Material 19–21 · Material 3</p>
          <h1 id="hero-title" class="hero-heading">A datetime picker that speaks Material 3.</h1>
          <p class="hero-lead">
            Calendar and time controls for Angular, with strict forms integration, accessible interactions,
            and an adapter-pluggable core.
          </p>

          <div class="install-block">
            <span class="install-label">Install the core package</span>
            <app-code [source]="installCmd" lang="bash"></app-code>
          </div>

          <div class="hero-actions">
            <a class="hero-button hero-button-primary" href="#examples">Try live examples</a>
            <a class="hero-button hero-button-secondary" href="https://github.com/sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">
              View on GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div class="capabilities" aria-label="Package capabilities">
            <span>Angular 19–21</span>
            <span>Reactive forms</span>
            <span>Accessible dialog</span>
            <span>Adapter-pluggable</span>
          </div>
        </div>

        <div class="preview-stage" aria-label="Interactive datetime picker workbench">
          <div class="preview-shell">
            <div class="preview-head">
              <strong>Live preview</strong>
              <span>Material 3</span>
            </div>

            <mat-form-field appearance="outline" class="preview-field" subscriptSizing="dynamic">
              <mat-label>Selected datetime</mat-label>
              <input matInput readonly [sdDatetimePicker]="heroPicker" [formControl]="previewControl">
              <button matSuffix mat-icon-button [sdDatetimePickerToggle]="heroPicker" aria-label="Open interactive datetime picker">
                <mat-icon>event</mat-icon>
              </button>
              <sd-datetime-picker
                #heroPicker
                [startAt]="committedValue()"
                (applied)="handlePickerApplied($event)"
              ></sd-datetime-picker>
            </mat-form-field>

            <div class="inline-picker" aria-label="Always-visible datetime controls">
              <mat-calendar
                [selected]="draftValue()"
                [startAt]="draftValue()"
                (selectedChange)="selectPreviewDate($event)"
              ></mat-calendar>
              <sd-time-spinner
                [value]="draftValue()"
                [baseValue]="draftValue()"
                (valueChange)="selectPreviewTime($event)"
              ></sd-time-spinner>
              <div class="preview-actions">
                <button mat-button type="button" (click)="setPreviewToNow()">
                  <mat-icon>schedule</mat-icon>
                  Now
                </button>
                <button mat-button type="button" (click)="resetPreviewDraft()">Cancel</button>
                <button mat-flat-button type="button" (click)="applyPreviewDraft()">Apply</button>
              </div>
            </div>

            <div class="preview-value" aria-live="polite">
              <span>Committed value</span>
              <code>{{ committedIso() }}</code>
            </div>
            <p class="preview-readable">{{ committedValue() | date:'MMM d, y, h:mm a' }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 58%, transparent);
      background:
        radial-gradient(circle at 86% 10%, color-mix(in srgb, var(--mat-sys-primary-container) 88%, transparent) 0, transparent 35%),
        radial-gradient(circle at 54% 90%, color-mix(in srgb, var(--mat-sys-tertiary) 7%, transparent) 0, transparent 28%),
        var(--mat-sys-surface-container-low);
    }

    .hero-inner {
      display: grid;
      max-width: 1200px;
      min-height: 720px;
      align-items: center;
      gap: clamp(42px, 7vw, 92px);
      margin: 0 auto;
      padding: 56px 24px 64px;
      grid-template-columns: minmax(0, .92fr) minmax(480px, 1.08fr);
    }

    .hero-copy,
    .preview-stage,
    .preview-shell {
      min-width: 0;
    }

    .hero-eyebrow {
      display: flex;
      align-items: center;
      gap: 9px;
      margin: 0 0 18px;
      color: var(--mat-sys-primary);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .1em;
      text-transform: uppercase;
    }

    .hero-eyebrow::before {
      width: 8px;
      height: 8px;
      border: 4px solid var(--mat-sys-primary-container);
      border-radius: 50%;
      background: var(--mat-sys-primary);
      content: '';
    }

    .hero-heading {
      max-width: 610px;
      margin: 0;
      color: var(--mat-sys-on-surface);
      font-size: clamp(46px, 5vw, 70px);
      font-weight: 780;
      letter-spacing: -.05em;
      line-height: 1.01;
    }

    .hero-lead {
      max-width: 620px;
      margin: 24px 0 26px;
      color: var(--mat-sys-on-surface-variant);
      font-size: 18px;
      line-height: 1.65;
    }

    .install-block {
      max-width: 620px;
      min-width: 0;
    }

    .install-label {
      display: block;
      margin-bottom: 8px;
      color: var(--mat-sys-on-surface-variant);
      font-size: 12px;
      font-weight: 700;
    }

    .preview-stage {
      position: relative;
    }

    .preview-stage::before {
      position: absolute;
      z-index: 0;
      inset: 12% -8% -5% 18%;
      border-radius: 48px;
      background: repeating-linear-gradient(135deg, color-mix(in srgb, var(--mat-sys-primary) 7%, transparent) 0 12px, transparent 12px 24px);
      content: '';
    }

    .preview-shell {
      position: relative;
      z-index: 1;
      width: min(100%, 540px);
      margin-left: auto;
      padding: 18px;
      border: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 72%, transparent);
      border-radius: 28px;
      background: var(--mat-sys-surface-container-lowest);
      box-shadow: var(--mat-sys-level3);
    }

    .preview-head,
    .preview-value {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .preview-head {
      margin-bottom: 12px;
      color: var(--mat-sys-on-surface);
      font-size: 13px;
      font-weight: 800;
    }

    .preview-head span {
      padding: 4px 8px;
      border-radius: 999px;
      background: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
      font-size: 10px;
      letter-spacing: .07em;
      text-transform: uppercase;
    }

    .preview-field {
      width: 100%;
      margin-bottom: 10px;
    }

    .inline-picker {
      overflow: hidden;
      border: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 76%, transparent);
      border-radius: 22px;
      background: var(--mat-sys-surface-container-lowest);
      box-shadow: var(--mat-sys-level1);
    }

    .inline-picker mat-calendar {
      display: block;
      width: 100%;
      background: var(--mat-sys-surface-container-lowest);
    }

    .inline-picker sd-time-spinner {
      min-height: 100px;
      border-top: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 62%, transparent);
      border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 62%, transparent);
      background: var(--mat-sys-surface-container-low);
    }

    .preview-actions {
      display: flex;
      min-height: 56px;
      align-items: center;
      justify-content: flex-end;
      gap: 4px;
      padding: 8px 10px;
      background: var(--mat-sys-surface-container-lowest);
    }

    .preview-actions button:first-child {
      margin-right: auto;
    }

    .preview-actions mat-icon {
      width: 18px;
      height: 18px;
      font-size: 18px;
    }

    .preview-value {
      padding: 14px 4px 0;
      color: var(--mat-sys-on-surface-variant);
      font-size: 12px;
    }

    .preview-value code {
      color: var(--mat-sys-tertiary);
      font-size: 12px;
      font-weight: 700;
    }

    @media (max-width: 1023px) {
      .hero-inner {
        min-height: 0;
        grid-template-columns: 1fr;
      }

      .preview-shell {
        width: min(100%, 620px);
        margin: 0;
      }

      .preview-stage::before {
        inset: 8% 4% -4% 16%;
      }
    }

    @media (max-width: 767px) {
      .hero-inner {
        gap: 34px;
        padding: 42px 16px 54px;
      }

      .hero-heading {
        font-size: clamp(36px, 12vw, 52px);
      }

      .hero-lead {
        margin-block: 20px;
        font-size: 16px;
      }

      .preview-stage::before {
        display: none;
      }

      .preview-shell {
        padding: 12px;
        border-radius: 22px;
      }
    }

    @media (max-width: 390px) {
      .hero-inner {
        padding-inline: 14px;
      }

      .hero-eyebrow {
        align-items: flex-start;
        font-size: 11px;
      }

      .preview-head,
      .preview-value {
        align-items: flex-start;
        flex-direction: column;
      }

      .preview-actions {
        flex-wrap: wrap;
      }

      .preview-actions button:first-child {
        margin-right: 0;
      }

    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly installCmd = `npm install @sdcorejs/angular-material-datetime`;
  readonly previewControl = new FormControl<Date | null>(cloneDate(INITIAL_PREVIEW_VALUE));
  protected readonly committedValue = signal(cloneDate(INITIAL_PREVIEW_VALUE));
  protected readonly draftValue = signal(cloneDate(INITIAL_PREVIEW_VALUE));
  protected readonly committedIso = computed(() => formatLocalDatetime(this.committedValue()));

  protected selectPreviewDate(date: Date | null): void {
    if (date == null) return;
    const current = this.draftValue();
    const next = cloneDate(date);
    next.setHours(current.getHours(), current.getMinutes(), current.getSeconds(), 0);
    this.draftValue.set(next);
  }

  protected selectPreviewTime(value: Date): void {
    this.draftValue.set(cloneDate(value));
  }

  protected setPreviewToNow(): void {
    this.draftValue.set(new Date());
  }

  protected resetPreviewDraft(): void {
    this.draftValue.set(cloneDate(this.committedValue()));
  }

  protected applyPreviewDraft(): void {
    const committed = cloneDate(this.draftValue());
    this.committedValue.set(committed);
    this.previewControl.setValue(cloneDate(committed));
  }

  protected handlePickerApplied(value: Date): void {
    const committed = cloneDate(value);
    this.committedValue.set(committed);
    this.draftValue.set(cloneDate(committed));
  }
}
