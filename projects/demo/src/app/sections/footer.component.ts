import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-inner">

        <div class="footer-col footer-brand">
          <img src="assets/brand/logo.png" alt="SDCoreJS" class="footer-logo">
          <p class="footer-copy">&copy; 2026 SDCoreJS contributors</p>
          <p class="footer-license">Released under the MIT License</p>
        </div>

        <div class="footer-col footer-links">
          <h4 class="footer-heading">Links</h4>
          <ul>
            <li><a href="https://github.com/sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.npmjs.com/package/@sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">npm</a></li>
            <li><a href="https://github.com/sdcorejs/angular-material-datetime/issues" target="_blank" rel="noopener noreferrer">Issues</a></li>
            <li><a href="https://github.com/sdcorejs/angular-material-datetime/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">Changelog</a></li>
          </ul>
        </div>

        <div class="footer-col footer-built">
          <h4 class="footer-heading">Built With</h4>
          <p>Angular 19 + Angular Material 19</p>
          <p>Signal-driven, standalone components</p>
          <p>Adapter-pluggable date handling</p>
          <p class="footer-version">
            <a href="https://www.npmjs.com/package/@sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/npm/v/@sdcorejs/angular-material-datetime?style=flat-square&label=npm" alt="npm version" loading="lazy">
            </a>
          </p>
        </div>

      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1a1a1a;
      color: #ccc;
      padding: 48px 24px;
      margin-top: 0;
    }

    .footer-inner {
      max-width: 1120px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr 2fr;
      gap: 40px;
    }

    .footer-col { display: flex; flex-direction: column; }

    .footer-logo {
      height: 36px;
      width: auto;
      margin-bottom: 12px;
      filter: brightness(0) invert(1);
      opacity: 0.85;
    }

    .footer-copy {
      margin: 0 0 4px;
      font-size: 14px;
      color: #aaa;
    }

    .footer-license {
      margin: 0;
      font-size: 13px;
      color: #777;
    }

    .footer-heading {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      margin: 0 0 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .footer-links ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .footer-links a {
      color: #aaa;
      text-decoration: none;
      font-size: 14px;
      transition: color .15s;
    }

    .footer-links a:hover {
      color: #fff;
    }

    .footer-built p {
      margin: 0 0 6px;
      font-size: 14px;
      color: #999;
    }

    .footer-version { margin-top: 12px !important; }

    .footer-version img { height: 20px; }

    @media (max-width: 768px) {
      .footer-inner { grid-template-columns: 1fr 1fr; }
      .footer-brand { grid-column: 1 / -1; }
    }

    @media (max-width: 480px) {
      .footer-inner { grid-template-columns: 1fr; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
