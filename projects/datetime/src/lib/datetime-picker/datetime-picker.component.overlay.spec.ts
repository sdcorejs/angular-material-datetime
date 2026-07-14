import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideSdNativeDateAdapter } from '../native/provide-native';
import { SdDatetimePicker } from './datetime-picker.component';
import { SdDatetimeIntl } from '../core/datetime-intl';

describe('SdDatetimePicker overlay', () => {
  let fixture: ComponentFixture<SdDatetimePicker<Date>>;
  let component: SdDatetimePicker<Date>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdDatetimePicker],
      providers: [provideSdNativeDateAdapter()],
    }).compileComponents();
    fixture = TestBed.createComponent(SdDatetimePicker<Date>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('open() attaches an overlay panel to the DOM', () => {
    expect(document.querySelector('.sd-datetime-picker__panel')).toBeNull();
    component.open();
    fixture.detectChanges();
    expect(document.querySelector('.sd-datetime-picker__panel')).not.toBeNull();
  });

  it('close() detaches the overlay panel', () => {
    component.open();
    fixture.detectChanges();
    component.close();
    fixture.detectChanges();
    expect(document.querySelector('.sd-datetime-picker__panel')).toBeNull();
  });

  it('backdrop click closes the picker', () => {
    component.open();
    fixture.detectChanges();
    const backdrop = document.querySelector('.cdk-overlay-backdrop') as HTMLElement;
    expect(backdrop).not.toBeNull();
    backdrop.click();
    fixture.detectChanges();
    expect(component.opened()).toBe(false);
  });

  it('backdrop and Escape roll draft back to committed value', () => {
    const committed = new Date(2026, 6, 14, 14, 0, 0);
    component.setValue(committed);
    component.open();
    component.select(new Date(2026, 7, 1, 9, 0, 0));
    (document.querySelector('.cdk-overlay-backdrop') as HTMLElement).click();
    expect(component.selected()).toEqual(committed);

    component.open();
    fixture.detectChanges();
    component.select(new Date(2026, 8, 1, 10, 0, 0));
    (document.querySelector('[role="dialog"]') as HTMLElement)
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(component.opened()).toBe(false);
    expect(component.selected()).toEqual(committed);
  });

  it('renders an accessible modal dialog and reacts to Intl changes', () => {
    component.open();
    fixture.detectChanges();
    const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.getAttribute('aria-label')).toBe('Choose date and time');

    const intl = TestBed.inject(SdDatetimeIntl);
    intl.dialogLabel = 'Chọn ngày và giờ';
    intl.cancelLabel = 'Hủy';
    intl.changes.next();
    fixture.detectChanges();
    expect(dialog.getAttribute('aria-label')).toBe('Chọn ngày và giờ');
    expect(document.querySelectorAll('.sd-datetime-picker__default-actions button')[1].textContent).toContain('Hủy');
  });

  it('moves focus into the dialog and installs a focus trap', async () => {
    component.open();
    fixture.detectChanges();
    await fixture.whenStable();
    const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
    expect(dialog.contains(document.activeElement) || document.activeElement === dialog).toBe(true);
    expect(document.querySelectorAll('.cdk-focus-trap-anchor')).toHaveLength(2);
  });

  it('uses a centered touch overlay class when touchUi is enabled', () => {
    fixture.componentRef.setInput('touchUi', true);
    fixture.detectChanges();
    component.open();
    fixture.detectChanges();
    expect(document.querySelector('.sd-datetime-picker__overlay--touch')).not.toBeNull();
  });
});

describe('SdDatetimePicker default actions fallback', () => {
  let fixture: ComponentFixture<SdDatetimePicker<Date>>;
  let component: SdDatetimePicker<Date>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdDatetimePicker],
      providers: [provideSdNativeDateAdapter()],
    }).compileComponents();
    fixture = TestBed.createComponent(SdDatetimePicker<Date>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders default Now/Cancel/Apply buttons when no actions content is projected', () => {
    component.open();
    fixture.detectChanges();
    const buttons = document.querySelectorAll('.sd-datetime-picker__default-actions button');
    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent?.trim()).toContain('Now');
    expect(buttons[1].textContent?.trim()).toContain('Cancel');
    expect(buttons[2].textContent?.trim()).toContain('Apply');
  });

  it('default Now button calls picker.now()', () => {
    component.open();
    fixture.detectChanges();
    expect(component.selected()).toBeNull();
    const nowBtn = document.querySelector('.sd-datetime-picker__default-now') as HTMLElement;
    nowBtn.click();
    expect(component.selected()).toBeInstanceOf(Date);
  });

  it('default Cancel button closes the picker', () => {
    component.open();
    fixture.detectChanges();
    const cancelBtn = document.querySelectorAll('.sd-datetime-picker__default-actions button')[1] as HTMLElement;
    cancelBtn.click();
    fixture.detectChanges();
    expect(component.opened()).toBe(false);
  });

  it('default Apply button emits applied with selected value and closes', () => {
    const selDate = new Date(2026, 4, 22, 14, 30, 0);
    component.setValue(selDate);
    component.open();
    fixture.detectChanges();
    const spy = jest.fn();
    component.applied.subscribe(spy);
    const applyBtn = document.querySelectorAll('.sd-datetime-picker__default-actions button')[2] as HTMLElement;
    applyBtn.click();
    expect(spy).toHaveBeenCalledWith(selDate);
    expect(component.opened()).toBe(false);
  });
});

class TestDatetimeIntl extends SdDatetimeIntl {
  override dialogLabel = 'Custom dialog label';
  override applyLabel = 'Confirm';
}

describe('SdDatetimePicker custom Intl provider', () => {
  it('uses labels from a custom SdDatetimeIntl provider', () => {
    TestBed.configureTestingModule({
      imports: [SdDatetimePicker],
      providers: [
        provideSdNativeDateAdapter(),
        { provide: SdDatetimeIntl, useClass: TestDatetimeIntl },
      ],
    });
    const fixture = TestBed.createComponent(SdDatetimePicker<Date>);
    fixture.detectChanges();
    fixture.componentInstance.open();
    fixture.detectChanges();
    expect(document.querySelector('[role="dialog"]')?.getAttribute('aria-label')).toBe('Custom dialog label');
    expect(document.querySelectorAll('.sd-datetime-picker__default-actions button')[2].textContent).toContain('Confirm');
  });
});
