import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  template: `
    <a class="skip-link" href="#examples">Skip to examples</a>
    <nav class="top-nav" aria-label="Primary navigation">
      <a class="nav-brand" href="#" aria-label="Angular Material Datetime home">
        <img src="brand/logo.png" alt="" class="nav-logo">
        <span class="nav-identity">
          <span class="nav-eyebrow">SDCoreJS</span>
          <span class="nav-title">Angular Material Datetime</span>
        </span>
      </a>

      <div class="nav-actions">
        <ul class="desktop-links">
          <li><a href="#examples">Examples</a></li>
          <li><a href="#api">API</a></li>
          <li><a href="#theming">Theming</a></li>
        </ul>

        <a class="nav-github" href="https://github.com/sdcorejs/angular-material-datetime" target="_blank" rel="noopener noreferrer" aria-label="View Angular Material Datetime on GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
        </a>

        <button
          #menuButton
          class="menu-button"
          type="button"
          aria-controls="mobile-navigation"
          [attr.aria-expanded]="menuOpen()"
          [attr.aria-label]="menuOpen() ? 'Close navigation menu' : 'Open navigation menu'"
          (click)="toggleMenu()"
        >
          @if (menuOpen()) {
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18"/>
            </svg>
          } @else {
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 7h14M5 12h14M5 17h14"/>
            </svg>
          }
        </button>
      </div>

      @if (menuOpen()) {
        <button class="menu-scrim" type="button" tabindex="-1" aria-hidden="true" (click)="closeMenu(true)"></button>
        <div #mobileMenu id="mobile-navigation" class="mobile-menu" aria-label="Mobile navigation links">
          <a href="#examples" (click)="closeMenu(false)"><span>Examples</span><span aria-hidden="true">↓</span></a>
          <a href="#api" (click)="closeMenu(false)"><span>API reference</span><span aria-hidden="true">↓</span></a>
          <a href="#theming" (click)="closeMenu(false)"><span>Theming</span><span aria-hidden="true">↓</span></a>
        </div>
      }
    </nav>
  `,
  styles: [`
    :host {
      position: sticky;
      z-index: 100;
      top: 0;
      display: block;
    }

    .skip-link {
      position: fixed;
      z-index: 200;
      top: 8px;
      left: 8px;
      transform: translateY(-160%);
      padding: 10px 14px;
      border-radius: 10px;
      background: var(--mat-sys-inverse-surface);
      color: var(--mat-sys-inverse-on-surface);
      font-weight: 700;
      text-decoration: none;
    }

    .skip-link:focus {
      transform: none;
    }

    .top-nav {
      position: relative;
      display: flex;
      min-height: 64px;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 8px max(24px, calc((100vw - 1200px) / 2));
      border-bottom: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 72%, transparent);
      background: color-mix(in srgb, var(--mat-sys-surface) 92%, transparent);
      box-shadow: var(--mat-sys-level1);
      backdrop-filter: blur(18px) saturate(135%);
    }

    .nav-brand,
    .nav-actions {
      position: relative;
      z-index: 2;
    }

    .nav-brand {
      display: flex;
      min-width: 0;
      align-items: center;
      gap: 11px;
      padding: 3px;
      border-radius: 10px;
      color: var(--mat-sys-on-surface);
      text-decoration: none;
    }

    .nav-logo {
      width: 38px;
      height: 38px;
      object-fit: contain;
    }

    .nav-identity {
      display: grid;
      min-width: 0;
      line-height: 1.08;
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

    .nav-actions,
    .desktop-links {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .desktop-links {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .desktop-links a,
    .nav-github,
    .menu-button {
      display: inline-flex;
      min-width: 44px;
      min-height: 44px;
      align-items: center;
      justify-content: center;
      padding: 8px 13px;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: var(--mat-sys-on-surface-variant);
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      transition: background-color 160ms ease, color 160ms ease;
    }

    .desktop-links a:hover,
    .menu-button:hover {
      background: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
    }

    .nav-github {
      padding: 8px;
      background: var(--mat-sys-inverse-surface);
      color: var(--mat-sys-inverse-on-surface);
    }

    .menu-button {
      display: none;
      border: 1px solid var(--mat-sys-outline-variant);
      background: var(--mat-sys-surface-container-lowest);
      cursor: pointer;
    }

    .menu-scrim {
      position: fixed;
      z-index: 1;
      inset: 64px 0 0;
      width: 100%;
      border: 0;
      background: color-mix(in srgb, var(--mat-sys-scrim) 38%, transparent);
    }

    .mobile-menu {
      position: absolute;
      z-index: 3;
      top: calc(100% + 8px);
      right: 12px;
      display: grid;
      width: min(280px, calc(100vw - 24px));
      overflow: hidden;
      padding: 8px;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 18px;
      background: var(--mat-sys-surface-container-lowest);
      box-shadow: var(--mat-sys-level3);
    }

    .mobile-menu a {
      display: flex;
      min-height: 48px;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 10px 14px;
      border-radius: 12px;
      color: var(--mat-sys-on-surface);
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
    }

    .mobile-menu a:hover,
    .mobile-menu a:focus-visible {
      background: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
    }

    @media (max-width: 767px) {
      .top-nav {
        min-height: 56px;
        gap: 8px;
        padding: 6px 12px;
      }

      .desktop-links {
        display: none;
      }

      .menu-button {
        display: inline-flex;
      }

      .nav-logo {
        width: 36px;
        height: 36px;
      }
    }

    @media (max-width: 390px) {
      .nav-identity {
        display: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .desktop-links a,
      .menu-button {
        transition: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  protected readonly menuOpen = signal(false);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly mobileMenu = viewChild<ElementRef<HTMLElement>>('mobileMenu');

  protected toggleMenu(): void {
    if (this.menuOpen()) {
      this.closeMenu(true);
      return;
    }

    this.menuOpen.set(true);
    setTimeout(() => this.mobileMenu()?.nativeElement.querySelector<HTMLElement>('a')?.focus());
  }

  protected closeMenu(restoreFocus: boolean): void {
    this.menuOpen.set(false);
    if (restoreFocus) setTimeout(() => this.menuButton()?.nativeElement.focus());
  }

  @HostListener('document:keydown', ['$event'])
  protected handleDocumentKeydown(event: KeyboardEvent): void {
    if (!this.menuOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeMenu(true);
      return;
    }

    if (event.key !== 'Tab') return;
    const menu = this.mobileMenu()?.nativeElement;
    const button = this.menuButton()?.nativeElement;
    if (!menu || !button) return;
    const focusable = [button, ...menu.querySelectorAll<HTMLElement>('a')];
    const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
    if (event.shiftKey && currentIndex <= 0) {
      event.preventDefault();
      focusable.at(-1)?.focus();
    } else if (!event.shiftKey && currentIndex === focusable.length - 1) {
      event.preventDefault();
      focusable[0]?.focus();
    }
  }

  @HostListener('window:resize')
  protected handleWindowResize(): void {
    if (window.innerWidth > 767 && this.menuOpen()) this.closeMenu(false);
  }
}
