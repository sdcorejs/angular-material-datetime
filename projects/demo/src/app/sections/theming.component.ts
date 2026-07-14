import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlockComponent } from '../code-block.component';

@Component({
  selector: 'app-theming',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <section id="theming" class="section">
      <div class="section-inner">
        <div class="section-intro">
          <p class="section-eyebrow">Design system</p>
          <h2 class="section-title">Material 3 theming</h2>
          <p class="section-desc">
            This library is M3-only. It consumes Angular Material system tokens directly, so the picker inherits
            your application palette, surface hierarchy, contrast, and theme mode without a separate color API.
          </p>
        </div>

        <div class="theming-layout">
          <article class="theming-card theming-card-featured">
            <div class="card-heading">
              <div>
                <p class="card-kicker">Foundation</p>
                <h3>Apply your application theme</h3>
                <p>Include <code>mat.theme</code> at the document root so system variables are available to overlays.</p>
              </div>
            </div>
            <app-code [source]="m3Setup" lang="scss"></app-code>
          </article>

          <article class="theming-card token-card">
            <div class="card-heading">
              <div>
                <p class="card-kicker">Reference</p>
                <h3>System tokens used</h3>
                <p>The picker stays visually aligned with the rest of your Angular Material application.</p>
              </div>
            </div>
            <dl class="token-list">
              <div>
                <dt><code>--mat-sys-surface-container</code></dt>
                <dd>Picker and time-spinner surfaces</dd>
              </div>
              <div>
                <dt><code>--mat-sys-primary</code></dt>
                <dd>Selection and active controls</dd>
              </div>
              <div>
                <dt><code>--mat-sys-outline-variant</code></dt>
                <dd>Dividers and subtle boundaries</dd>
              </div>
              <div>
                <dt><code>--mat-sys-on-surface-variant</code></dt>
                <dd>Supporting labels and secondary text</dd>
              </div>
            </dl>
          </article>

          <article class="theming-card">
            <div class="card-heading">
              <div>
                <p class="card-kicker">Scoped override</p>
                <h3>Customize with scoped tokens</h3>
                <p>Override system values on the picker overlay panel when one context needs a distinct treatment.</p>
              </div>
            </div>
            <app-code [source]="tokenCustomization" lang="scss"></app-code>
          </article>

          <article class="theming-card dark-card">
            <div class="card-heading">
              <div>
                <p class="card-kicker">Theme mode</p>
                <h3>Dark theme compatibility</h3>
                <p>Generate a dark M3 theme on your theme class. The overlay follows the active system tokens automatically.</p>
              </div>
            </div>
            <app-code [source]="darkTheme" lang="scss"></app-code>
            <p class="theme-note">
              Keep the theme class on a shared ancestor of the application and CDK overlay container so popup content receives the same token set.
            </p>
          </article>
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

    .section-intro {
      max-width: 780px;
      margin-bottom: 48px;
    }

    .section-eyebrow {
      margin: 0 0 10px;
      color: var(--mat-sys-primary);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .12em;
      text-transform: uppercase;
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
      margin: 0;
      color: var(--mat-sys-on-surface-variant);
      font-size: 17px;
      line-height: 1.7;
    }

    .theming-layout {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 24px;
    }

    .theming-card {
      min-width: 0;
      padding: 26px;
      border: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 74%, transparent);
      border-radius: 24px;
      background: var(--mat-sys-surface-container-lowest);
      box-shadow: var(--mat-sys-level1);
    }

    .theming-card-featured {
      grid-column: 1 / -1;
      background: linear-gradient(135deg, var(--mat-sys-primary-container), var(--mat-sys-surface-container-lowest) 70%);
    }

    .token-card {
      grid-column: 1 / -1;
    }

    .card-heading {
      margin-bottom: 22px;
    }

    .card-kicker {
      margin: 0 0 8px;
      color: var(--mat-sys-primary);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: .1em;
      text-transform: uppercase;
    }

    .card-heading h3 {
      margin: 0 0 6px;
      color: var(--mat-sys-on-surface);
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -.01em;
    }

    .card-heading p,
    .theme-note {
      margin: 0;
      color: var(--mat-sys-on-surface-variant);
      font-size: 14px;
      line-height: 1.6;
    }

    code {
      padding: 2px 5px;
      border-radius: 6px;
      background: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
      font-size: .9em;
    }

    .token-list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1px;
      overflow: hidden;
      margin: 0;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 16px;
      background: var(--mat-sys-outline-variant);
    }

    .token-list div {
      padding: 14px 16px;
      background: var(--mat-sys-surface-container-low);
    }

    .token-list dt {
      margin-bottom: 5px;
      overflow-wrap: anywhere;
    }

    .token-list dd {
      margin: 0;
      color: var(--mat-sys-on-surface-variant);
      font-size: 13px;
    }

    .theme-note {
      margin-top: 16px;
      padding: 14px 16px;
      border-radius: 14px;
      background: var(--mat-sys-tertiary-container);
      color: var(--mat-sys-on-tertiary-container);
    }

    .theming-card app-code {
      display: block;
      min-width: 0;
    }

    @media (max-width: 820px) {
      .theming-layout {
        grid-template-columns: 1fr;
      }

      .theming-card-featured {
        grid-column: auto;
      }

      .token-card {
        grid-column: auto;
      }
    }

    @media (max-width: 600px) {
      .section {
        padding: 64px 16px 72px;
      }

      .section-intro {
        margin-bottom: 36px;
      }

      .section-desc {
        font-size: 16px;
      }

      .theming-layout {
        gap: 18px;
      }

      .theming-card {
        padding: 20px;
        border-radius: 20px;
      }

      .token-list {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemingComponent {
  readonly m3Setup = `// styles.scss
@use '@angular/material' as mat;

html {
  color-scheme: light;

  @include mat.theme((
    color: (
      primary: mat.$azure-palette,
      theme-type: light,
    ),
    typography: Roboto,
    density: 0,
  ));
}`;

  readonly tokenCustomization = `.sd-datetime-picker__overlay {
  --mat-sys-primary: #2859a8;
  --mat-sys-on-primary: #ffffff;
  --mat-sys-surface-container: #f2f5fc;
  --mat-sys-outline-variant: #c3c6d0;
}`;

  readonly darkTheme = `.dark-theme {
  color-scheme: dark;

  @include mat.theme((
    color: (
      primary: mat.$azure-palette,
      theme-type: dark,
    ),
  ));
}`;
}
