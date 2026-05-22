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
