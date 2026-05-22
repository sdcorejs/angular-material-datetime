import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlockComponent } from '../code-block.component';

@Component({
  selector: 'app-theming',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <section id="theming" class="section">
      <div class="section-inner">
        <h2 class="section-title">Theming</h2>
        <p class="section-desc">
          The library works out-of-the-box with both Material 2 and Material 3 themes.
          For best visual harmony, use Material 3.
        </p>

        <div class="theming-grid">
          <!-- Comparison table -->
          <div class="table-wrapper">
            <table class="theming-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Material 3 (recommended)</th>
                  <th>Material 2 (legacy)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Setup</td>
                  <td><code>mat.theme(...)</code></td>
                  <td><code>mat.core() + mat.all-component-themes($theme)</code></td>
                </tr>
                <tr>
                  <td>Color tokens</td>
                  <td>Reads <code>--mat-sys-surface-container</code>, <code>--mat-sys-primary</code>, <code>--mat-sys-outline-variant</code>, <code>--mat-sys-on-surface-variant</code></td>
                  <td>Falls back to neutral defaults (<code>#fff</code> surface, <code>#1976d2</code> primary)</td>
                </tr>
                <tr>
                  <td>Dark mode</td>
                  <td>Automatic via system tokens</td>
                  <td>Requires manual palette override</td>
                </tr>
                <tr>
                  <td>Picker chrome</td>
                  <td>Follows your app theme automatically</td>
                  <td>Neutral defaults unless custom override</td>
                </tr>
                <tr>
                  <td>Hybrid M2+M3</td>
                  <td colspan="2">Supported — picker prefers M3 tokens when present</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="theming-details">
            <div class="theming-card">
              <h3 class="theming-card-title">
                <span class="badge badge-purple">M3</span>
                Material 3 (Recommended)
              </h3>
              <p>
                The picker reads the following CSS custom properties that Material 3 defines automatically:
              </p>
              <ul>
                <li><code>--mat-sys-surface-container</code> — overlay background</li>
                <li><code>--mat-sys-primary</code> — accent color (selected day, time spinner highlight)</li>
                <li><code>--mat-sys-outline-variant</code> — divider between calendar and time spinner</li>
                <li><code>--mat-sys-on-surface-variant</code> — secondary text</li>
              </ul>
              <p>Colors automatically follow your app's palette, including dark mode.</p>
              <app-code [source]="m3Setup" lang="scss"></app-code>
            </div>

            <div class="theming-card">
              <h3 class="theming-card-title">
                <span class="badge badge-blue">M2</span>
                Material 2 (Legacy)
              </h3>
              <p>
                The M3 tokens are not defined in a Material 2 setup, so the picker falls back to neutral defaults:
              </p>
              <ul>
                <li>Surface: <code>#fff</code></li>
                <li>Primary: <code>#1976d2</code></li>
                <li>Outline: <code>#e0e0e0</code></li>
              </ul>
              <p>
                All Material primitives inside the picker (<code>&lt;mat-calendar&gt;</code>, icon buttons, flat buttons)
                are still themed by Angular Material itself. Only the picker's own chrome uses the fallback colors.
              </p>
              <p>For custom palette override in M2, target the host class:</p>
              <app-code [source]="m2Override" lang="scss"></app-code>
            </div>
          </div>
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

    .theming-grid {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .table-wrapper {
      overflow-x: auto;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #fff;
    }

    .theming-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    .theming-table th {
      background: #f5f5f5;
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 2px solid #e0e0e0;
    }

    .theming-table td {
      padding: 11px 16px;
      border-bottom: 1px solid #f0f0f0;
      vertical-align: top;
      color: #444;
      line-height: 1.5;
    }

    .theming-table tbody tr:last-child td {
      border-bottom: none;
    }

    .theming-table code {
      background: #f1f3f4;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      color: #c62828;
      font-family: 'Roboto Mono', monospace;
    }

    .theming-details {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
      gap: 24px;
    }

    .theming-card {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 24px;
    }

    .theming-card-title {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .theming-card p {
      font-size: 14px;
      color: #555;
      margin: 0 0 12px;
      line-height: 1.6;
    }

    .theming-card ul {
      margin: 0 0 12px;
      padding-left: 20px;
    }

    .theming-card li {
      font-size: 14px;
      color: #555;
      margin-bottom: 4px;
      line-height: 1.5;
    }

    .theming-card code {
      background: #f1f3f4;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      color: #c62828;
      font-family: 'Roboto Mono', monospace;
    }

    .badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
    }

    .badge-blue { background: #e3f0fd; color: #1565c0; }
    .badge-purple { background: #f3e5f5; color: #7b1fa2; }

    @media (max-width: 600px) {
      .section { padding: 40px 16px; }
      .section-title { font-size: 24px; }
      .theming-details { grid-template-columns: 1fr; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemingComponent {
  readonly m3Setup = `// In your styles.scss
@use '@angular/material' as mat;

html {
  @include mat.theme((
    color: (
      primary: mat.$azure-palette,
      theme-type: light,
    ),
    typography: Roboto,
    density: 0,
  ));
}`;

  readonly m2Override = `// Override picker chrome in Material 2
.sd-datetime-picker__overlay {
  --sd-picker-surface: #your-surface-color;
  --sd-picker-primary: #your-primary-color;
}`;
}
