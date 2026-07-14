import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <img src="brand/logo.png" alt="SDCoreJS" class="footer-logo">
          <div>
            <p class="footer-kicker">SDCoreJS · Angular Material Datetime</p>
            <h2>Datetime controls that speak Material 3.</h2>
            <p class="footer-summary">Signal-driven, adapter-pluggable components for Angular applications.</p>
          </div>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">Project</h3>
          <ul>
            <li><a href="https://github.com/sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">GitHub repository <span aria-hidden="true">&#8599;</span></a></li>
            <li><a href="https://www.npmjs.com/package/@sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">npm package <span aria-hidden="true">&#8599;</span></a></li>
            <li><a href="https://github.com/sdcorejs/angular-material-datetime/issues" target="_blank" rel="noopener noreferrer">Issues <span aria-hidden="true">&#8599;</span></a></li>
            <li><a href="https://github.com/sdcorejs/angular-material-datetime/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">Changelog <span aria-hidden="true">&#8599;</span></a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">SDCoreJS</h3>
          <ul>
            <li><a href="https://github.com/sdcorejs" target="_blank" rel="noopener noreferrer">GitHub organization <span aria-hidden="true">&#8599;</span></a></li>
            <li><a href="https://www.npmjs.com/org/sdcorejs" target="_blank" rel="noopener noreferrer">npm organization <span aria-hidden="true">&#8599;</span></a></li>
          </ul>
          <p class="footer-stack">Verified with Angular 19–21 · Material 3 · Standalone components and signals.</p>
        </div>

        <div class="footer-bottom">
          <div class="author">
            <span>Author</span>
            <strong>Trần Thuận Nghĩa</strong>
            <a href="mailto:tran.thuan.nghia@gmail.com">tran.thuan.nghia&#64;gmail.com</a>
          </div>
          <div class="footer-meta">
            <p>&copy; 2026 SDCoreJS contributors <span aria-hidden="true">&middot;</span> <a href="https://github.com/sdcorejs/angular-material-datetime/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a></p>
            <a class="version-badge" href="https://www.npmjs.com/package/@sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer" aria-label="View current npm version">
              <span>View on npm</span>
              <img src="https://img.shields.io/npm/v/@sdcorejs/angular-material-datetime?style=flat-square&label=npm" alt="npm version" loading="lazy">
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      padding: 48px 24px 24px;
      background: var(--mat-sys-inverse-surface);
      color: var(--mat-sys-inverse-on-surface);
    }

    .footer-inner {
      display: grid;
      max-width: 1184px;
      margin: 0 auto;
      grid-template-columns: minmax(0, 2fr) minmax(150px, .75fr) minmax(190px, 1fr);
      gap: 32px 48px;
    }

    .footer-brand {
      display: flex;
      min-width: 0;
      align-items: flex-start;
      gap: 18px;
    }

    .footer-brand > div,
    .footer-col,
    .footer-bottom,
    .footer-meta {
      min-width: 0;
    }

    .footer-logo {
      width: 48px;
      height: 48px;
      object-fit: contain;
      filter: brightness(0) invert(1);
      opacity: .94;
    }

    .footer-kicker {
      margin: 0 0 8px;
      color: var(--mat-sys-inverse-primary);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: .1em;
      text-transform: uppercase;
    }

    .footer-brand h2 {
      max-width: 500px;
      margin: 0 0 8px;
      color: var(--mat-sys-inverse-on-surface);
      font-size: clamp(21px, 2.5vw, 28px);
      font-weight: 700;
      letter-spacing: -.025em;
      line-height: 1.18;
    }

    .footer-summary,
    .footer-stack {
      max-width: 520px;
      margin: 0;
      color: color-mix(in srgb, var(--mat-sys-inverse-on-surface) 72%, transparent);
      font-size: 14px;
      line-height: 1.6;
    }

    .footer-heading {
      margin: 0 0 8px;
      color: var(--mat-sys-inverse-on-surface);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .1em;
      text-transform: uppercase;
    }

    .footer-col ul {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .footer-col a,
    .author a {
      display: inline-flex;
      min-height: 44px;
      align-items: center;
      border-radius: 5px;
      color: color-mix(in srgb, var(--mat-sys-inverse-on-surface) 78%, transparent);
      font-size: 14px;
      overflow-wrap: anywhere;
      text-decoration: none;
      transition: color 160ms ease;
    }

    .footer-col a:hover,
    .author a:hover {
      color: var(--mat-sys-inverse-primary);
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .footer-stack {
      margin-top: 16px;
      font-size: 13px;
    }

    .footer-bottom {
      display: flex;
      grid-column: 1 / -1;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      margin-top: 4px;
      padding-top: 20px;
      border-top: 1px solid color-mix(in srgb, var(--mat-sys-inverse-on-surface) 18%, transparent);
    }

    .author {
      display: grid;
      min-width: 0;
      grid-template-columns: auto auto;
      gap: 0 12px;
    }

    .author span {
      grid-row: 1 / 3;
      align-self: center;
      color: color-mix(in srgb, var(--mat-sys-inverse-on-surface) 54%, transparent);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
    }

    .author strong {
      align-self: end;
      font-size: 14px;
    }

    .author a {
      align-self: start;
      font-size: 13px;
    }

    .footer-meta {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    .footer-meta p {
      display: flex;
      min-width: 0;
      align-items: center;
      gap: 4px;
      margin: 0;
      color: color-mix(in srgb, var(--mat-sys-inverse-on-surface) 58%, transparent);
      font-size: 12px;
    }

    .footer-meta p a {
      display: inline-flex;
      min-height: 44px;
      align-items: center;
      border-radius: 5px;
      color: inherit;
      text-underline-offset: 3px;
    }

    .version-badge {
      display: inline-flex;
      min-height: 44px;
      flex: 0 0 auto;
      align-items: center;
      gap: 8px;
      padding: 0 6px;
      border-radius: 6px;
      color: var(--mat-sys-inverse-on-surface);
      font-size: 12px;
      text-decoration: none;
    }

    .version-badge img {
      display: block;
      height: 20px;
    }

    .footer a:focus-visible {
      outline: 3px solid var(--mat-sys-inverse-primary);
      outline-offset: 3px;
    }

    @media (max-width: 900px) {
      .footer-inner {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .footer-brand {
        grid-column: 1 / -1;
      }

      .footer-bottom {
        align-items: flex-start;
        flex-direction: column;
      }

      .footer-meta {
        justify-content: flex-start;
      }
    }

    @media (max-width: 620px) {
      .footer {
        padding: 40px 16px 24px;
      }

      .footer-inner {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .footer-brand {
        grid-column: auto;
        flex-direction: column;
      }

      .footer-bottom {
        grid-column: auto;
        margin-top: 0;
      }

      .footer-meta,
      .footer-meta p {
        align-items: flex-start;
        flex-direction: column;
      }

      .author a,
      .footer-meta p {
        overflow-wrap: anywhere;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .footer-col a,
      .author a {
        transition: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
