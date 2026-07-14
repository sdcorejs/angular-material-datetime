import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  template: `
    <nav class="top-nav" aria-label="Primary navigation">
      <a class="nav-brand" href="https://github.com/sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer">
        <img src="brand/logo.png" alt="SDCoreJS logo" class="nav-logo">
        <span class="nav-identity">
          <span class="nav-eyebrow">SDCoreJS</span>
          <span class="nav-title">Angular Material Datetime</span>
        </span>
      </a>
      <ul class="nav-links">
        <li><a href="#examples">Examples</a></li>
        <li><a href="#api">API</a></li>
        <li><a href="#theming">Theming</a></li>
        <li>
          <a class="nav-github" href="https://github.com/sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer" aria-label="View Angular Material Datetime on GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
      min-height: 68px;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 8px max(24px, calc((100vw - 1184px) / 2));
      border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 65%, transparent);
      background: color-mix(in srgb, var(--mat-sys-surface) 92%, transparent);
      box-shadow: var(--mat-sys-level1);
      backdrop-filter: blur(16px) saturate(140%);
    }

    .nav-brand {
      display: flex;
      min-width: 0;
      align-items: center;
      gap: 12px;
      padding: 4px;
      border-radius: 12px;
      color: var(--mat-sys-on-surface);
      text-decoration: none;
    }

    .nav-logo {
      width: 36px;
      height: 36px;
      object-fit: contain;
    }

    .nav-identity {
      display: flex;
      min-width: 0;
      flex-direction: column;
      line-height: 1.15;
    }

    .nav-eyebrow {
      color: var(--mat-sys-primary);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: .12em;
      text-transform: uppercase;
    }

    .nav-title {
      overflow: hidden;
      color: var(--mat-sys-on-surface);
      font-size: 14px;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .nav-links a {
      display: flex;
      min-height: 44px;
      align-items: center;
      padding: 8px 14px;
      border-radius: 999px;
      color: var(--mat-sys-on-surface-variant);
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      transition: background-color 160ms ease, color 160ms ease;
    }

    .nav-links a:hover {
      background: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
    }

    .nav-github {
      justify-content: center;
      min-width: 44px;
      padding: 8px !important;
      background: var(--mat-sys-inverse-surface);
      color: var(--mat-sys-inverse-on-surface) !important;
    }

    @media (max-width: 720px) {
      .top-nav {
        gap: 8px;
        padding-inline: 12px;
      }

      .nav-identity {
        display: none;
      }

      .nav-links a {
        padding-inline: 9px;
        font-size: 13px;
      }
    }

    @media (max-width: 400px) {
      .nav-logo {
        width: 32px;
        height: 32px;
      }

      .nav-links a {
        padding-inline: 7px;
        font-size: 12px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {}
