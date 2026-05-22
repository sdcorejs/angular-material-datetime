import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SdTimeSpinner } from './time-spinner.component';

describe('SdTimeSpinner', () => {
  let fixture: ComponentFixture<SdTimeSpinner>;
  let component: SdTimeSpinner;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SdTimeSpinner] }).compileComponents();
    fixture = TestBed.createComponent(SdTimeSpinner);
    component = fixture.componentInstance;
  });

  it('renders with selector sd-time-spinner', () => {
    fixture.detectChanges();
    // Angular 19 + jest-preset-angular renders the component into a host div (root0);
    // verify the component mounts correctly via its host class and an existing instance
    expect(component).toBeInstanceOf(SdTimeSpinner);
    expect(fixture.nativeElement.classList).toContain('sd-time-spinner');
  });

  it('default showSeconds is false', () => {
    expect(component.showSeconds()).toBe(false);
  });

  it('default stepMinute is 1', () => {
    expect(component.stepMinute()).toBe(1);
  });

  it('defaults to hour=0, minute=0, second=0 when value is null', () => {
    fixture.componentRef.setInput('value', null);
    fixture.detectChanges();
    expect(component.hour()).toBe(0);
    expect(component.minute()).toBe(0);
    expect(component.second()).toBe(0);
  });

  it('parses value Date into hour/minute/second signals', () => {
    fixture.componentRef.setInput('value', new Date(2026, 4, 22, 14, 30, 15));
    fixture.detectChanges();
    expect(component.hour()).toBe(14);
    expect(component.minute()).toBe(30);
    expect(component.second()).toBe(15);
  });
});

describe('SdTimeSpinner step buttons', () => {
  let fixture: ComponentFixture<SdTimeSpinner>;
  let component: SdTimeSpinner;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SdTimeSpinner] }).compileComponents();
    fixture = TestBed.createComponent(SdTimeSpinner);
    component = fixture.componentInstance;
  });

  it('stepHourUp increments hour and emits valueChange', () => {
    fixture.componentRef.setInput('value', new Date(2026, 4, 22, 10, 0, 0));
    fixture.detectChanges();
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.stepHourUp();
    expect(spy).toHaveBeenCalledWith(expect.any(Date));
    expect(spy.mock.calls[0][0].getHours()).toBe(11);
  });

  it('stepHourUp wraps 23 → 0', () => {
    fixture.componentRef.setInput('value', new Date(2026, 4, 22, 23, 0, 0));
    fixture.detectChanges();
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.stepHourUp();
    expect(spy.mock.calls[0][0].getHours()).toBe(0);
  });

  it('stepHourDown wraps 0 → 23', () => {
    fixture.componentRef.setInput('value', new Date(2026, 4, 22, 0, 0, 0));
    fixture.detectChanges();
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.stepHourDown();
    expect(spy.mock.calls[0][0].getHours()).toBe(23);
  });

  it('stepMinuteUp respects stepMinute=5', () => {
    fixture.componentRef.setInput('value', new Date(2026, 4, 22, 10, 0, 0));
    fixture.componentRef.setInput('stepMinute', 5);
    fixture.detectChanges();
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.stepMinuteUp();
    expect(spy.mock.calls[0][0].getMinutes()).toBe(5);
  });

  it('stepMinuteUp wraps 59 → 0', () => {
    fixture.componentRef.setInput('value', new Date(2026, 4, 22, 10, 59, 0));
    fixture.detectChanges();
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.stepMinuteUp();
    expect(spy.mock.calls[0][0].getMinutes()).toBe(0);
  });

  it('stepSecondUp increments by 1 and wraps 59 → 0', () => {
    fixture.componentRef.setInput('value', new Date(2026, 4, 22, 10, 30, 59));
    fixture.detectChanges();
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.stepSecondUp();
    expect(spy.mock.calls[0][0].getSeconds()).toBe(0);
  });

  it('does nothing when disabled', () => {
    fixture.componentRef.setInput('value', new Date(2026, 4, 22, 10, 0, 0));
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.stepHourUp();
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('SdTimeSpinner typing into a column', () => {
  let fixture: ComponentFixture<SdTimeSpinner>;
  let component: SdTimeSpinner;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SdTimeSpinner] }).compileComponents();
    fixture = TestBed.createComponent(SdTimeSpinner);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', new Date(2026, 4, 22, 10, 30, 0));
    fixture.detectChanges();
  });

  it('onHourInput accepts a valid hour and emits', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.onHourInput('22');
    expect(spy.mock.calls[0][0].getHours()).toBe(22);
  });

  it('onHourInput clamps out-of-range hour (25 → 23) and emits', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.onHourInput('25');
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].getHours()).toBe(23);
  });

  it('onMinuteInput strips non-digits ("-1" → "1" → emits minute=1)', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.onMinuteInput('-1');
    // '-' is stripped by /\D/g, leaving '1' → valid minute → emit
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].getMinutes()).toBe(1);
  });

  it('onSecondInput accepts 0..59', () => {
    fixture.componentRef.setInput('showSeconds', true);
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.onSecondInput('45');
    expect(spy.mock.calls[0][0].getSeconds()).toBe(45);
  });
});

describe('SdTimeSpinner keydown digit-only filter', () => {
  let fixture: ComponentFixture<SdTimeSpinner>;
  let component: SdTimeSpinner;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SdTimeSpinner] }).compileComponents();
    fixture = TestBed.createComponent(SdTimeSpinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('onDigitKeyDown does not preventDefault for digit keys', () => {
    const ev = new KeyboardEvent('keydown', { key: '5' });
    const spy = jest.spyOn(ev, 'preventDefault');
    component.onDigitKeyDown(ev);
    expect(spy).not.toHaveBeenCalled();
  });

  it('onDigitKeyDown preventDefault for non-digit alphabetic keys', () => {
    const ev = new KeyboardEvent('keydown', { key: 'a' });
    const spy = jest.spyOn(ev, 'preventDefault');
    component.onDigitKeyDown(ev);
    expect(spy).toHaveBeenCalled();
  });

  it('onDigitKeyDown allows Backspace and arrows', () => {
    for (const key of ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight']) {
      const ev = new KeyboardEvent('keydown', { key });
      const spy = jest.spyOn(ev, 'preventDefault');
      component.onDigitKeyDown(ev);
      expect(spy).not.toHaveBeenCalled();
    }
  });

  it('onDigitKeyDown allows Ctrl+A / Ctrl+C / Ctrl+V / Ctrl+X', () => {
    for (const key of ['a', 'c', 'v', 'x']) {
      const ev = new KeyboardEvent('keydown', { key, ctrlKey: true });
      const spy = jest.spyOn(ev, 'preventDefault');
      component.onDigitKeyDown(ev);
      expect(spy).not.toHaveBeenCalled();
    }
  });
});
