import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlockComponent } from '../code-block.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-copy">
          <img src="brand/logo-text.png" alt="SDCoreJS" class="hero-logo">
          <p class="hero-eyebrow"><span aria-hidden="true"></span> Material 3-native · M3-only</p>
          <h1 class="hero-heading">Angular datetime controls that feel at home in Material 3.</h1>
          <p class="hero-sub">
            Datetime, timepicker, and date-range picker primitives for Angular Material —
            adapter-pluggable, signal-driven, and built exclusively for Material 3 themes.
          </p>

          <div class="hero-badges" aria-label="Project details">
            <span class="badge">Angular 19+</span>
            <span class="badge">Material 19+</span>
            <span class="badge">MIT License</span>
          </div>

          <div class="hero-actions">
            <a class="hero-btn hero-btn-primary" href="https://github.com/sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              View on GitHub
            </a>
            <a class="hero-btn hero-btn-secondary" href="https://www.npmjs.com/package/@sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.331h-2.669zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z"/>
                <path d="M10.665 10h1.336v2.667h-1.336z"/>
              </svg>
              View on npm
            </a>
          </div>
        </div>

        <div class="hero-summary" aria-label="Package highlights">
          <div class="summary-topline">
            <span>Install the core package</span>
            <span class="summary-status"><span aria-hidden="true"></span> Production-ready API</span>
          </div>
          <app-code [source]="installCmd" lang="bash"></app-code>
          <div class="summary-grid">
            <div><strong>3</strong><span>Picker modes</span></div>
            <div><strong>3</strong><span>Included adapters</span></div>
            <div><strong>M3</strong><span>System tokens</span></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      overflow: hidden;
      padding: 88px 24px 80px;
      border-bottom: 1px solid var(--mat-sys-outline-variant);
      background:
        radial-gradient(circle at 82% 16%, color-mix(in srgb, var(--mat-sys-tertiary-container) 74%, transparent) 0, transparent 33%),
        linear-gradient(145deg, var(--mat-sys-surface) 0%, var(--mat-sys-surface-container-low) 100%);
    }

    .hero-inner {
      position: relative;
      display: grid;
      max-width: 1184px;
      margin: 0 auto;
      grid-template-columns: minmax(0, 1.2fr) minmax(360px, .8fr);
      align-items: center;
      gap: clamp(40px, 7vw, 96px);
    }

    .hero-copy {
      min-width: 0;
    }

    .hero-logo {
      width: auto;
      max-width: 100%;
      height: 48px;
      margin-bottom: 28px;
    }

    .hero-eyebrow {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0 0 18px;
      color: var(--mat-sys-primary);
      font-size: 13px;
      font-weight: 800;
      letter-spacing: .09em;
      text-transform: uppercase;
    }

    .hero-eyebrow span,
    .summary-status span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--mat-sys-primary);
      box-shadow: 0 0 0 5px var(--mat-sys-primary-container);
    }

    .hero-heading {
      max-width: 740px;
      margin: 0 0 24px;
      color: var(--mat-sys-on-surface);
      font-size: clamp(40px, 5.4vw, 68px);
      font-weight: 750;
      letter-spacing: -.045em;
      line-height: 1.04;
    }

    .hero-sub {
      max-width: 680px;
      margin: 0 0 28px;
      color: var(--mat-sys-on-surface-variant);
      font-size: 18px;
      line-height: 1.7;
    }

    .hero-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 32px;
    }

    .badge {
      display: inline-flex;
      min-height: 32px;
      align-items: center;
      padding: 5px 12px;
      border-radius: 999px;
      background: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
      font-size: 13px;
      font-weight: 700;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .hero-btn {
      display: inline-flex;
      min-height: 48px;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 11px 22px;
      border: 1px solid transparent;
      border-radius: 999px;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      transition: transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
    }

    .hero-btn:hover {
      transform: translateY(-2px);
    }

    .hero-btn-primary {
      background: var(--mat-sys-primary);
      color: var(--mat-sys-on-primary);
      box-shadow: var(--mat-sys-level2);
    }

    .hero-btn-primary:hover {
      box-shadow: var(--mat-sys-level3);
    }

    .hero-btn-secondary {
      border-color: var(--mat-sys-outline);
      background: var(--mat-sys-surface);
      color: var(--mat-sys-primary);
    }

    .hero-btn-secondary:hover {
      background: var(--mat-sys-primary-container);
    }

    .hero-summary {
      min-width: 0;
      padding: 24px;
      border: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 72%, transparent);
      border-radius: 28px;
      background: color-mix(in srgb, var(--mat-sys-surface-container-lowest) 92%, transparent);
      box-shadow: var(--mat-sys-level3);
    }

    .summary-topline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 16px;
      color: var(--mat-sys-on-surface);
      font-size: 13px;
      font-weight: 700;
    }

    .summary-status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--mat-sys-on-surface-variant);
      font-weight: 500;
    }

    .summary-status span {
      width: 6px;
      height: 6px;
      box-shadow: none;
    }

    .summary-grid {
      display: grid;
      overflow: hidden;
      margin-top: 18px;
      border-radius: 16px;
      background: var(--mat-sys-outline-variant);
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
    }

    .summary-grid div {
      display: flex;
      min-width: 0;
      flex-direction: column;
      gap: 2px;
      padding: 16px 10px;
      background: var(--mat-sys-surface-container-low);
      text-align: center;
    }

    .summary-grid strong {
      color: var(--mat-sys-primary);
      font-size: 22px;
      line-height: 1.2;
    }

    .summary-grid span {
      color: var(--mat-sys-on-surface-variant);
      font-size: 11px;
    }

    @media (max-width: 900px) {
      .hero {
        padding-block: 64px;
      }

      .hero-inner {
        grid-template-columns: 1fr;
      }

      .hero-summary {
        width: 100%;
        max-width: 620px;
      }
    }

    @media (max-width: 600px) {
      .hero {
        padding: 48px 16px 52px;
      }

      .hero-logo {
        height: 40px;
        margin-bottom: 22px;
      }

      .hero-heading {
        font-size: 38px;
      }

      .hero-sub {
        font-size: 16px;
      }

      .hero-actions,
      .hero-btn {
        width: 100%;
      }

      .hero-summary {
        padding: 18px;
        border-radius: 22px;
      }

      .summary-topline {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly installCmd = `npm install @sdcorejs/angular-material-datetime`;
}
