import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavComponent } from './sections/nav.component';
import { HeroComponent } from './sections/hero.component';
import { ExamplesComponent } from './sections/examples.component';
import { ApiReferenceComponent } from './sections/api-reference.component';
import { ThemingComponent } from './sections/theming.component';
import { FooterComponent } from './sections/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    ExamplesComponent,
    ApiReferenceComponent,
    ThemingComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
