import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  input,
  viewChild,
} from '@angular/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markup';

@Component({
  selector: 'app-code',
  standalone: true,
  template: `<pre [class]="'language-' + lang()"><code #code [class]="'language-' + lang()">{{ source() }}</code></pre>`,
  styles: [`
    :host { display: block; }
    pre { margin: 0; border-radius: 8px; font-size: 13px; line-height: 1.5; max-height: 480px; overflow: auto; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  public readonly source = input.required<string>();
  public readonly lang = input<'typescript' | 'html' | 'bash' | 'scss'>('typescript');
  private readonly codeEl = viewChild<ElementRef<HTMLElement>>('code');

  constructor() {
    afterNextRender(() => {
      const el = this.codeEl()?.nativeElement;
      if (el) Prism.highlightElement(el);
    });
  }
}
