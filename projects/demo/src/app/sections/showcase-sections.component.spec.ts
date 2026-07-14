import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideSdNativeDateAdapter } from '@sdcorejs/angular-material-datetime';
import { ApiReferenceComponent } from './api-reference.component';
import { ExamplesComponent } from './examples.component';
import { FooterComponent } from './footer.component';
import { HeroComponent } from './hero.component';
import { NavComponent } from './nav.component';
import { ThemingComponent } from './theming.component';

async function createFixture<T>(component: Type<T>): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [provideSdNativeDateAdapter(), provideNoopAnimations()],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
}

describe('showcase navigation', () => {
  afterEach(() => jest.useRealTimers());

  it('opens the mobile navigation, moves focus, and restores it after Escape', async () => {
    jest.useFakeTimers();
    const fixture = await createFixture(NavComponent);
    const menuButton = fixture.nativeElement.querySelector('.menu-button') as HTMLButtonElement;

    menuButton.click();
    fixture.detectChanges();
    jest.runOnlyPendingTimers();

    const menu = fixture.nativeElement.querySelector('#mobile-navigation') as HTMLElement;
    const links = menu.querySelectorAll('a');
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');
    expect(links).toHaveLength(3);
    expect(document.activeElement).toBe(links[0]);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    jest.runOnlyPendingTimers();

    expect(fixture.nativeElement.querySelector('#mobile-navigation')).toBeNull();
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(menuButton);
  });

  it('closes mobile navigation when the viewport grows to desktop width', async () => {
    const originalInnerWidth = window.innerWidth;
    try {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });
      const fixture = await createFixture(NavComponent);
      const menuButton = fixture.nativeElement.querySelector('.menu-button') as HTMLButtonElement;

      menuButton.click();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#mobile-navigation')).not.toBeNull();

      Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 });
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('#mobile-navigation')).toBeNull();
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    } finally {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalInnerWidth });
    }
  });
});

describe('showcase hero workbench', () => {
  it('renders the deterministic July 2026 calendar and initial time', async () => {
    const fixture = await createFixture(HeroComponent);
    const calendarCells = fixture.nativeElement.querySelectorAll('.inline-picker .mat-calendar-body-cell');
    const timeInputs = fixture.nativeElement.querySelectorAll('.inline-picker .sd-time-spinner__digits') as NodeListOf<HTMLInputElement>;

    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('speaks Material 3');
    expect(calendarCells).toHaveLength(31);
    expect([...timeInputs].map((input) => input.value)).toEqual(['10', '30']);
    expect(fixture.nativeElement.querySelector('.preview-value code').textContent.trim()).toBe('2026-07-14T10:30');
  });

  it('commits spinner changes on Apply and restores the draft on Cancel', async () => {
    const fixture = await createFixture(HeroComponent);
    const hourUp = fixture.nativeElement.querySelector('.inline-picker .sd-time-spinner__col:first-child button') as HTMLButtonElement;
    const actionButtons = fixture.nativeElement.querySelectorAll('.preview-actions button') as NodeListOf<HTMLButtonElement>;

    hourUp.click();
    fixture.detectChanges();
    actionButtons[2].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.preview-value code').textContent.trim()).toBe('2026-07-14T11:30');

    hourUp.click();
    fixture.detectChanges();
    actionButtons[1].click();
    fixture.detectChanges();
    const timeInputs = fixture.nativeElement.querySelectorAll('.inline-picker .sd-time-spinner__digits') as NodeListOf<HTMLInputElement>;
    expect([...timeInputs].map((input) => input.value)).toEqual(['11', '30']);
  });

  it('opens the actual picker as an accessible dialog with default actions', async () => {
    const originalConsoleError = console.error;
    const consoleError = jest.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
      const first = args[0];
      // jsdom cannot parse CDK's CSS @layer output; browser smoke covers the real stylesheet.
      if (String(first).includes('Could not parse CSS stylesheet')) {
        return;
      }
      originalConsoleError(...args);
    });
    const fixture = await createFixture(HeroComponent);
    const toggle = fixture.nativeElement.querySelector('.preview-field button[aria-haspopup="dialog"]') as HTMLButtonElement;

    try {
      toggle.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const dialog = document.querySelector('.sd-datetime-picker__panel') as HTMLElement;
      const actions = dialog.querySelectorAll('.sd-datetime-picker__default-actions button');
      expect(dialog.getAttribute('role')).toBe('dialog');
      expect(dialog.getAttribute('aria-modal')).toBe('true');
      expect(dialog.querySelectorAll('.mat-calendar-body-cell')).toHaveLength(31);
      expect([...actions].map((button) => button.textContent?.trim())).toEqual(expect.arrayContaining([
        expect.stringContaining('Now'),
        'Cancel',
        'Apply',
      ]));

      (actions[1] as HTMLButtonElement).click();
      fixture.detectChanges();
      expect(document.querySelector('.sd-datetime-picker__panel')).toBeNull();
    } finally {
      consoleError.mockRestore();
    }
  });
});

describe('showcase example explorer', () => {
  it('switches developer intent and selects its first example', async () => {
    const fixture = await createFixture(ExamplesComponent);
    const intentButtons = fixture.nativeElement.querySelectorAll('.intent-controls button') as NodeListOf<HTMLButtonElement>;

    expect(intentButtons).toHaveLength(4);
    expect([...intentButtons].every((button) => !button.classList.contains('mat-mdc-button-base'))).toBe(true);
    expect(fixture.nativeElement.querySelectorAll('.intent-controls .mat-mdc-button-persistent-ripple')).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('#featured-example h3').textContent.trim()).toBe('Basic');
    intentButtons[1].click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#featured-example h3').textContent.trim()).toBe('Required validation');
    expect(fixture.nativeElement.querySelector('#example-required').getAttribute('aria-pressed')).toBe('true');
  });

  it('shows explicit invalid feedback when the required example is submitted empty', async () => {
    const fixture = await createFixture(ExamplesComponent);
    const formsIntent = fixture.nativeElement.querySelectorAll('.intent-controls button')[1] as HTMLButtonElement;

    formsIntent.click();
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.validation-form button[type="submit"]') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('mat-error').textContent.trim()).toBe('Datetime is required');
    expect(fixture.nativeElement.querySelector('.validation-msg.invalid').textContent.trim()).toBe('Please fill in all required fields.');
  });

  it('selects a specific example while keeping its intent active', async () => {
    const fixture = await createFixture(ExamplesComponent);
    const minuteStep = fixture.nativeElement.querySelector('#example-minute-step') as HTMLButtonElement;
    const featured = fixture.nativeElement.querySelector('#featured-example') as HTMLElement;
    featured.scrollIntoView = jest.fn();

    minuteStep.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#featured-example h3').textContent.trim()).toBe('Minute step');
    expect(minuteStep.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.querySelectorAll('.intent-controls button')[2].getAttribute('aria-pressed')).toBe('true');
    expect(featured.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });
});

describe('showcase reference and project information', () => {
  it('publishes semantic API tables with the current closed-event payload', async () => {
    const fixture = await createFixture(ApiReferenceComponent);
    const regions = fixture.nativeElement.querySelectorAll('.table-wrapper[role="region"][tabindex="0"]');
    const headers = fixture.nativeElement.querySelectorAll('th[scope="col"]');
    const rows = [...fixture.nativeElement.querySelectorAll('tbody tr')] as HTMLTableRowElement[];
    const closedRow = rows.find((row) => row.cells[0]?.textContent?.trim() === 'closed');

    expect(regions).toHaveLength(5);
    expect(headers.length).toBeGreaterThan(0);
    expect(closedRow?.cells[1].textContent?.trim()).toBe('SdDatetimeCloseReason');
  });

  it('documents M3-only theming and system-token customization', async () => {
    const fixture = await createFixture(ThemingComponent);
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Material 3 theming');
    expect(text).toContain('M3-only');
    expect(text).toContain('--mat-sys-primary');
    expect(text).toContain('Dark theme compatibility');
  });

  it('shows package compatibility and the approved author contact', async () => {
    const fixture = await createFixture(FooterComponent);
    const email = fixture.nativeElement.querySelector('a[href="mailto:tran.thuan.nghia@gmail.com"]') as HTMLAnchorElement;
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('Verified with Angular 19');
    expect(text).toContain('Material 3');
    expect(email.textContent?.trim()).toBe('tran.thuan.nghia@gmail.com');
  });
});
