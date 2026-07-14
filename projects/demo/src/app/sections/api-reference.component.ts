import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-api-reference',
  standalone: true,
  template: `
    <section id="api" class="section section-alt">
      <div class="section-inner">
        <h2 class="section-title">API Reference</h2>
        <p class="section-desc">Complete list of inputs, outputs, and methods for the datetime picker components.</p>

        <!-- sd-datetime-picker inputs -->
        <h3 class="sub-title"><code>&lt;sd-datetime-picker&gt;</code> Inputs</h3>
        <div class="table-wrapper">
          <table class="api-table">
            <thead>
              <tr>
                <th>Input</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>showSeconds</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Show the seconds column in the time spinner</td>
              </tr>
              <tr>
                <td><code>stepMinute</code></td>
                <td><code>number</code></td>
                <td><code>1</code></td>
                <td>Minute increment for up/down step buttons</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Disable the picker; ignores open/close calls</td>
              </tr>
              <tr>
                <td><code>minDate</code></td>
                <td><code>D | null</code></td>
                <td><code>null</code></td>
                <td>Earliest selectable date</td>
              </tr>
              <tr>
                <td><code>maxDate</code></td>
                <td><code>D | null</code></td>
                <td><code>null</code></td>
                <td>Latest selectable date</td>
              </tr>
              <tr>
                <td><code>startAt</code></td>
                <td><code>D | null</code></td>
                <td><code>null</code></td>
                <td>Calendar's initial focused date if no value is selected</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- sd-datetime-picker outputs -->
        <h3 class="sub-title"><code>&lt;sd-datetime-picker&gt;</code> Outputs</h3>
        <div class="table-wrapper">
          <table class="api-table">
            <thead>
              <tr>
                <th>Output</th>
                <th>Payload</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>applied</code></td>
                <td><code>D</code></td>
                <td>Emitted when the user clicks the Apply button</td>
              </tr>
              <tr>
                <td><code>cleared</code></td>
                <td><code>void</code></td>
                <td>Emitted when <code>clear()</code> is called programmatically</td>
              </tr>
              <tr>
                <td><code>closed</code></td>
                <td><code>void</code></td>
                <td>Emitted when the overlay closes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- sd-datetime-picker methods -->
        <h3 class="sub-title"><code>&lt;sd-datetime-picker&gt;</code> Methods</h3>
        <div class="table-wrapper">
          <table class="api-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Signature</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>open()</code></td>
                <td><code>() =&gt; void</code></td>
                <td>Open the overlay (no-op if disabled or already open)</td>
              </tr>
              <tr>
                <td><code>close()</code></td>
                <td><code>() =&gt; void</code></td>
                <td>Close the overlay</td>
              </tr>
              <tr>
                <td><code>apply()</code></td>
                <td><code>() =&gt; void</code></td>
                <td>Emit applied event with the selected value and close</td>
              </tr>
              <tr>
                <td><code>clear()</code></td>
                <td><code>() =&gt; void</code></td>
                <td>Clear the selection and close</td>
              </tr>
              <tr>
                <td><code>now()</code></td>
                <td><code>() =&gt; void</code></td>
                <td>Set selection to current Date (does NOT auto-apply)</td>
              </tr>
              <tr>
                <td><code>select(value)</code></td>
                <td><code>(value: D) =&gt; void</code></td>
                <td>Set the picker's selected value programmatically</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- sdDatetimePicker directive -->
        <h3 class="sub-title"><code>[sdDatetimePicker]</code> Input Directive</h3>
        <div class="table-wrapper">
          <table class="api-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>sdDatetimePicker</code></td>
                <td>Required. Takes a reference to an <code>SdDatetimePicker&lt;D&gt;</code> instance.</td>
              </tr>
              <tr>
                <td>ControlValueAccessor</td>
                <td>Implements <code>ControlValueAccessor</code> — value type <code>D | null</code>. Compatible with <code>[formControl]</code>, <code>formControlName</code>, and <code>[(ngModel)]</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Supporting directives -->
        <h3 class="sub-title">Supporting Directives &amp; Components</h3>
        <div class="table-wrapper">
          <table class="api-table">
            <thead>
              <tr>
                <th>Selector</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>[sdDatetimePickerToggle]</code></td>
                <td>Attach to a button to open/close the picker. Automatically disables when the picker is disabled.</td>
              </tr>
              <tr>
                <td><code>&lt;sd-datetime-picker-actions&gt;</code></td>
                <td>Content projection slot for the action buttons row at the bottom of the overlay.</td>
              </tr>
              <tr>
                <td><code>[sdDatetimePickerApply]</code></td>
                <td>Calls <code>apply()</code> on click.</td>
              </tr>
              <tr>
                <td><code>[sdDatetimePickerCancel]</code></td>
                <td>Calls <code>close()</code> on click without applying.</td>
              </tr>
              <tr>
                <td><code>[sdDatetimePickerNow]</code></td>
                <td>Calls <code>now()</code> on click — sets time to current without applying.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Default actions note -->
        <h3 class="sub-title">Default Actions</h3>
        <p class="section-desc" style="margin-top: 0;">
          If you don't project a <code>&lt;sd-datetime-picker-actions&gt;</code> element, the picker renders a built-in row
          with <strong>Now</strong> (left, with clock icon), <strong>Cancel</strong>, and <strong>Apply</strong> (right).
          Project your own block to fully override — <code>SdDatetimePickerActions</code>, <code>SdDatetimePickerApply</code>,
          <code>SdDatetimePickerCancel</code>, and <code>SdDatetimePickerNow</code> are only needed when projecting custom content.
        </p>
      </div>
    </section>
  `,
  styles: [`
    .section {
      padding: 88px 24px 96px;
    }

    .section-alt {
      background: var(--mat-sys-surface-container-low);
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
      max-width: 760px;
      margin: 0 0 44px;
      color: var(--mat-sys-on-surface-variant);
      font-size: 17px;
      line-height: 1.65;
    }

    .sub-title {
      margin: 40px 0 14px;
      color: var(--mat-sys-on-surface);
      font-size: 21px;
      font-weight: 700;
      letter-spacing: -.01em;
    }

    .sub-title code {
      padding: 4px 9px;
      border-radius: 8px;
      background: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
      font-size: 17px;
    }

    .table-wrapper {
      overflow-x: auto;
      border: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 78%, transparent);
      border-radius: 18px;
      background: var(--mat-sys-surface-container-lowest);
      box-shadow: var(--mat-sys-level1);
      scrollbar-color: var(--mat-sys-outline-variant) transparent;
    }

    .api-table {
      width: 100%;
      min-width: 680px;
      border-collapse: collapse;
      font-size: 14px;
    }

    .api-table th {
      padding: 14px 18px;
      border-bottom: 1px solid var(--mat-sys-outline-variant);
      background: var(--mat-sys-surface-container);
      color: var(--mat-sys-on-surface);
      text-align: left;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .055em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .api-table td {
      padding: 14px 18px;
      border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 58%, transparent);
      color: var(--mat-sys-on-surface-variant);
      vertical-align: top;
      line-height: 1.55;
    }

    .api-table tbody tr:last-child td {
      border-bottom: none;
    }

    .api-table tbody tr:hover td {
      background: var(--mat-sys-surface-container-low);
    }

    .api-table code {
      padding: 3px 7px;
      border-radius: 7px;
      background: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
      font-size: 13px;
      white-space: nowrap;
    }

    @media (max-width: 600px) {
      .section {
        padding: 64px 16px 72px;
      }

      .section-desc {
        margin-bottom: 34px;
        font-size: 16px;
      }

      .sub-title {
        margin-top: 34px;
        font-size: 18px;
      }

      .api-table {
        min-width: 620px;
      }

      .api-table th,
      .api-table td {
        padding-inline: 14px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiReferenceComponent {}
