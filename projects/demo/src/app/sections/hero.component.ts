import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlockComponent } from '../code-block.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <section class="hero">
      <div class="hero-inner">
        <img src="assets/brand/logo-text.png" alt="SDCoreJS" class="hero-logo">
        <h1 class="hero-heading">Angular Material Datetime</h1>
        <p class="hero-sub">
          Datetime, timepicker, and date-range picker for Angular Material —
          adapter-pluggable, signal-driven, Material 3-ready.
        </p>

        <div class="hero-badges">
          <span class="badge badge-blue">Angular 19+</span>
          <span class="badge badge-purple">Material 19+</span>
          <span class="badge badge-green">MIT License</span>
        </div>

        <div class="hero-install">
          <app-code [source]="installCmd" lang="bash"></app-code>
        </div>

        <div class="hero-actions">
          <a
            class="hero-btn hero-btn-primary"
            href="https://github.com/sdcorejs/angular-material-datetime"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            View on GitHub
          </a>
          <a
            class="hero-btn hero-btn-secondary"
            href="https://www.npmjs.com/package/@sdcorejs/angular-material-datetime"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.331h-2.669zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z"/>
              <path d="M10.665 10h1.336v2.667h-1.336z"/>
            </svg>
            View on npm
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #f5f7fa 0%, #fff 60%, #e8f0fe 100%);
      padding: 80px 24px 64px;
      text-align: center;
      border-bottom: 1px solid #e8eaed;
    }

    .hero-inner {
      max-width: 720px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .hero-logo {
      height: 64px;
      width: auto;
    }

    .hero-heading {
      margin: 0;
      font-size: 40px;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: -0.5px;
    }

    .hero-sub {
      margin: 0;
      font-size: 18px;
      color: #555;
      line-height: 1.6;
      max-width: 580px;
    }

    .hero-badges {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .badge {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.3px;
    }

    .badge-blue { background: #e3f0fd; color: #1565c0; }
    .badge-purple { background: #f3e5f5; color: #7b1fa2; }
    .badge-green { background: #e8f5e9; color: #2e7d32; }

    .hero-install {
      width: 100%;
      max-width: 420px;
    }

    .hero-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .hero-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 22px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 500;
      text-decoration: none;
      transition: all .18s;
    }

    .hero-btn-primary {
      background: #1976d2;
      color: #fff;
      box-shadow: 0 2px 8px rgba(25,118,210,.25);
    }

    .hero-btn-primary:hover {
      background: #1565c0;
      box-shadow: 0 4px 12px rgba(25,118,210,.35);
    }

    .hero-btn-secondary {
      background: #fff;
      color: #1976d2;
      border: 1.5px solid #1976d2;
    }

    .hero-btn-secondary:hover {
      background: #e3f0fd;
    }

    @media (max-width: 600px) {
      .hero { padding: 48px 16px 40px; }
      .hero-heading { font-size: 28px; }
      .hero-sub { font-size: 15px; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly installCmd = `npm install @sdcorejs/angular-material-datetime`;
}
