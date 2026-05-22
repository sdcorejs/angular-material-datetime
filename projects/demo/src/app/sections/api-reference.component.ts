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
      padding: 64px 24px;
    }

    .section-alt {
      background: #f8f9fa;
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

    .sub-title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin: 32px 0 12px;
    }

    .sub-title code {
      font-size: 18px;
      background: #e8eaed;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .table-wrapper {
      overflow-x: auto;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #fff;
    }

    .api-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    .api-table th {
      background: #f5f5f5;
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 2px solid #e0e0e0;
      white-space: nowrap;
    }

    .api-table td {
      padding: 11px 16px;
      border-bottom: 1px solid #f0f0f0;
      vertical-align: top;
      color: #444;
      line-height: 1.5;
    }

    .api-table tbody tr:last-child td {
      border-bottom: none;
    }

    .api-table tbody tr:hover td {
      background: #fafafa;
    }

    .api-table code {
      background: #f1f3f4;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
      color: #c62828;
      font-family: 'Roboto Mono', monospace;
    }

    @media (max-width: 600px) {
      .section { padding: 40px 16px; }
      .section-title { font-size: 24px; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiReferenceComponent {}
