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
            <p class="footer-kicker">Open-source Angular tooling</p>
            <h2>Thoughtful datetime controls for Material 3.</h2>
            <p class="footer-summary">Signal-driven, adapter-pluggable components maintained as part of the SDCoreJS ecosystem.</p>
          </div>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">Project</h3>
          <ul>
            <li><a href="https://github.com/sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">GitHub repository <span aria-hidden="true">↗</span></a></li>
            <li><a href="https://www.npmjs.com/package/@sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">npm package <span aria-hidden="true">↗</span></a></li>
            <li><a href="https://github.com/sdcorejs/angular-material-datetime/issues" target="_blank" rel="noopener noreferrer">Issues <span aria-hidden="true">↗</span></a></li>
            <li><a href="https://github.com/sdcorejs/angular-material-datetime/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">Changelog <span aria-hidden="true">↗</span></a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-heading">SDCoreJS</h3>
          <ul>
            <li><a href="https://github.com/sdcorejs" target="_blank" rel="noopener noreferrer">GitHub organization <span aria-hidden="true">↗</span></a></li>
            <li><a href="https://www.npmjs.com/org/sdcorejs" target="_blank" rel="noopener noreferrer">npm organization <span aria-hidden="true">↗</span></a></li>
          </ul>
          <p class="footer-stack">Built with Angular 19, Angular Material 19, standalone components, and signals.</p>
        </div>

        <div class="footer-bottom">
          <div class="author">
            <span>Author</span>
            <strong>Trần Thuận Nghĩa</strong>
            <a href="mailto:tran.thuan.nghia@gmail.com">tran.thuan.nghia&#64;gmail.com</a>
          </div>
          <div class="footer-meta">
            <p>&copy; 2026 SDCoreJS contributors · Released under the MIT License</p>
            <a class="version-badge" href="https://www.npmjs.com/package/@sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer" aria-label="View current npm version">
              <img src="https://img.shields.io/npm/v/@sdcorejs/angular-material-datetime?style=flat-square&label=npm" alt="npm version" loading="lazy">
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      padding: 72px 24px 28px;
      background: var(--mat-sys-inverse-surface);
      color: var(--mat-sys-inverse-on-surface);
    }

    .footer-inner {
      display: grid;
      max-width: 1184px;
      margin: 0 auto;
      grid-template-columns: minmax(0, 2fr) minmax(150px, .75fr) minmax(190px, 1fr);
      gap: 48px;
    }

    .footer-brand {
      display: flex;
      align-items: flex-start;
      gap: 18px;
    }

    .footer-logo {
      width: 48px;
      height: 48px;
      object-fit: contain;
      filter: brightness(0) invert(1);
      opacity: .94;
    }

    .footer-kicker {
      margin: 0 0 10px;
      color: var(--mat-sys-inverse-primary);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: .12em;
      text-transform: uppercase;
    }

    .footer-brand h2 {
      max-width: 500px;
      margin: 0 0 12px;
      color: var(--mat-sys-inverse-on-surface);
      font-size: clamp(24px, 3vw, 34px);
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
      line-height: 1.65;
    }

    .footer-heading {
      margin: 0 0 16px;
      color: var(--mat-sys-inverse-on-surface);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .1em;
      text-transform: uppercase;
    }

    .footer-col ul {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .footer-col a,
    .author a {
      border-radius: 5px;
      color: color-mix(in srgb, var(--mat-sys-inverse-on-surface) 78%, transparent);
      font-size: 14px;
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
      margin-top: 22px;
      font-size: 13px;
    }

    .footer-bottom {
      display: flex;
      grid-column: 1 / -1;
      align-items: flex-end;
      justify-content: space-between;
      gap: 28px;
      margin-top: 14px;
      padding-top: 28px;
      border-top: 1px solid color-mix(in srgb, var(--mat-sys-inverse-on-surface) 18%, transparent);
    }

    .author {
      display: grid;
      grid-template-columns: auto auto;
      gap: 2px 12px;
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
      font-size: 14px;
    }

    .author a {
      font-size: 13px;
    }

    .footer-meta {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
    }

    .footer-meta p {
      margin: 0;
      color: color-mix(in srgb, var(--mat-sys-inverse-on-surface) 58%, transparent);
      font-size: 12px;
    }

    .version-badge {
      display: inline-flex;
      padding: 4px;
      border-radius: 6px;
    }

    .version-badge img {
      display: block;
      height: 20px;
    }

    .footer a:focus-visible {
      outline-color: var(--mat-sys-inverse-primary);
    }

    @media (max-width: 900px) {
      .footer-inner {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .footer-brand {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 620px) {
      .footer {
        padding: 56px 16px 24px;
      }

      .footer-inner {
        grid-template-columns: 1fr;
        gap: 36px;
      }

      .footer-brand {
        grid-column: auto;
        flex-direction: column;
      }

      .footer-bottom {
        grid-column: auto;
        align-items: flex-start;
        flex-direction: column;
        margin-top: 0;
      }

      .footer-meta {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
