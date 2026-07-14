import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  input,
  signal,
  viewChild,
} from '@angular/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markup';

@Component({
  selector: 'app-code',
  standalone: true,
  template: `
    <div class="code-shell">
      <span class="language-label">{{ lang() }}</span>
      <button class="copy-button" type="button" (click)="copySource()" [attr.aria-label]="copied() ? 'Code copied' : 'Copy code'">
        @if (copied()) {
          <span aria-hidden="true">✓</span> Copied
        } @else {
          <span aria-hidden="true">⧉</span> Copy
        }
      </button>
      <pre [class]="'language-' + lang()"><code #code [class]="'language-' + lang()">{{ source() }}</code></pre>
      <span class="copy-status" aria-live="polite">{{ copied() ? 'Code copied to clipboard' : '' }}</span>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-width: 0;
    }

    .code-shell {
      position: relative;
      overflow: hidden;
      border: 1px solid color-mix(in srgb, var(--mat-sys-outline-variant) 54%, transparent);
      border-radius: 14px;
      background: #1e1e24;
      box-shadow: var(--mat-sys-level1);
    }

    .language-label {
      position: absolute;
      z-index: 1;
      top: 11px;
      left: 14px;
      color: #c8c7d0;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      pointer-events: none;
    }

    .copy-button {
      position: absolute;
      z-index: 2;
      top: 8px;
      right: 8px;
      display: inline-flex;
      min-height: 34px;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border: 1px solid #55545e;
      border-radius: 9px;
      background: #2c2b33;
      color: #f1eff7;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      transition: background-color 160ms ease, border-color 160ms ease;
    }

    .copy-button:hover {
      border-color: #8d8b98;
      background: #3a3942;
    }

    .copy-button:focus-visible {
      outline-color: #adc6ff;
    }

    pre {
      max-height: 480px;
      margin: 0;
      padding: 52px 18px 18px;
      overflow: auto;
      border-radius: 0;
      font-size: 13px;
      line-height: 1.65;
      tab-size: 2;
    }

    .copy-status {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  public readonly source = input.required<string>();
  public readonly lang = input<'typescript' | 'html' | 'bash' | 'scss'>('typescript');
  protected readonly copied = signal(false);
  private readonly codeEl = viewChild<ElementRef<HTMLElement>>('code');
  private copiedResetTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    afterNextRender(() => {
      const el = this.codeEl()?.nativeElement;
      if (el) Prism.highlightElement(el);
    });
  }

  protected async copySource(): Promise<void> {
    await navigator.clipboard.writeText(this.source());
    this.copied.set(true);
    clearTimeout(this.copiedResetTimer);
    this.copiedResetTimer = setTimeout(() => this.copied.set(false), 1800);
  }
}
