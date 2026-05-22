import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  template: `
    <nav class="top-nav">
      <a class="nav-brand" href="https://github.com/sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">
        <img src="assets/brand/logo.png" alt="SDCoreJS logo" class="nav-logo">
        <span class="nav-title">sdcorejs/angular-material-datetime</span>
      </a>
      <ul class="nav-links">
        <li><a href="#examples">Examples</a></li>
        <li><a href="#api">API</a></li>
        <li><a href="#theming">Theming</a></li>
        <li>
          <a class="nav-github" href="https://github.com/sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .top-nav {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      height: 60px;
      background: #fff;
      border-bottom: 1px solid #e8eaed;
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #1a1a1a;
    }

    .nav-logo {
      height: 30px;
      width: auto;
    }

    .nav-title {
      font-size: 14px;
      font-weight: 500;
      font-family: 'Roboto Mono', monospace;
      color: #333;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 4px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      display: flex;
      align-items: center;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      color: #444;
      transition: background .15s, color .15s;
    }

    .nav-links a:hover {
      background: #f1f3f4;
      color: #1976d2;
    }

    .nav-github {
      padding: 6px 10px !important;
      color: #666 !important;
    }

    @media (max-width: 600px) {
      .nav-title { display: none; }
      .nav-links a { padding: 6px 8px; font-size: 13px; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {}
