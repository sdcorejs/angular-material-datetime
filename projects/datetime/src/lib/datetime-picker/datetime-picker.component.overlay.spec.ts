import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideSdNativeDateAdapter } from '../native/provide-native';
import { SdDatetimePicker } from './datetime-picker.component';

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
    component.select(selDate);
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
