import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideSdNativeDateAdapter } from '../native/provide-native';
import { SdDatetimePicker } from './datetime-picker.component';
import { SD_DATETIME_DEFAULT_OPTIONS } from '../core/default-options';
import { SdNativeDateAdapter } from '../native/native-date-adapter';

describe('SdDatetimePicker', () => {
  let fixture: ComponentFixture<SdDatetimePicker<Date>>;
  let component: SdDatetimePicker<Date>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdDatetimePicker],
      providers: [provideSdNativeDateAdapter()],
    }).compileComponents();
    fixture = TestBed.createComponent(SdDatetimePicker<Date>);
    component = fixture.componentInstance;
  });

  it('component instance is SdDatetimePicker (host class applied)', () => {
    fixture.detectChanges();
    expect(component).toBeInstanceOf(SdDatetimePicker);
    expect((fixture.nativeElement as HTMLElement).classList.contains('sd-datetime-picker')).toBe(true);
  });

  it('default showSeconds is false', () => {
    expect(component.showSeconds()).toBe(false);
  });

  it('coerces boolean inputs with booleanAttribute semantics', () => {
    fixture.componentRef.setInput('showSeconds', '');
    fixture.componentRef.setInput('disabled', '');
    fixture.detectChanges();
    expect(component.showSeconds()).toBe(true);
    expect(component.disabled()).toBe(true);
  });

  it('coerces valid string, number, and Date inputs into dates', () => {
    const start = new Date(2026, 4, 22, 14, 30, 0);
    fixture.componentRef.setInput('minDate', '2026-01-01T00:00:00.000Z');
    fixture.componentRef.setInput('maxDate', start.getTime());
    fixture.componentRef.setInput('startAt', start);
    fixture.detectChanges();
    expect(component.minDate()).toBeInstanceOf(Date);
    expect(component.maxDate()).toBeInstanceOf(Date);
    expect(component.startAt()).toBe(start);
  });

  it('coerces undefined, null, empty, and invalid date inputs to null', () => {
    fixture.componentRef.setInput('minDate', undefined);
    fixture.componentRef.setInput('maxDate', '');
    fixture.componentRef.setInput('startAt', 'not-a-date');
    fixture.detectChanges();
    expect(component.minDate()).toBeNull();
    expect(component.maxDate()).toBeNull();
    expect(component.startAt()).toBeNull();
  });

  it('opened signal is false initially', () => {
    expect(component.opened()).toBe(false);
  });

  it('open() sets opened to true', () => {
    component.open();
    expect(component.opened()).toBe(true);
  });

  it('close() sets opened to false', () => {
    component.open();
    component.close();
    expect(component.opened()).toBe(false);
  });

  it('open() is no-op when already opened', () => {
    component.open();
    expect(component.opened()).toBe(true);
    component.open();
    expect(component.opened()).toBe(true);
  });

  it('open() is no-op when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.open();
    expect(component.opened()).toBe(false);
  });

  it('rolls a cancelled draft back to the last applied value', () => {
    const committed = new Date(2026, 4, 22, 14, 30, 0);
    const cancelledDraft = new Date(2026, 5, 10, 9, 15, 0);
    component.select(committed);
    component.apply();

    component.open();
    component.select(cancelledDraft);
    component.close();
    component.open();

    const applied = jest.fn();
    component.applied.subscribe(applied);
    component.apply();
    expect(applied).toHaveBeenCalledWith(committed);
  });

  it('keeps time when selecting a new date and keeps date when selecting a new time', () => {
    component.setValue(new Date(2026, 6, 14, 13, 45, 20));

    component.selectDatePart(new Date(2026, 7, 1, 0, 0, 0));
    expect(component.selected()).toEqual(new Date(2026, 7, 1, 13, 45, 20));

    component.selectTimePart(new Date(2000, 0, 1, 9, 45, 20));
    expect(component.selected()).toEqual(new Date(2026, 7, 1, 9, 45, 20));
  });

  it('validates full datetime min/max boundaries and strict minute steps', () => {
    fixture.componentRef.setInput('minDate', new Date(2026, 6, 14, 14, 0, 0));
    fixture.componentRef.setInput('maxDate', new Date(2026, 6, 15, 10, 0, 0));
    fixture.componentRef.setInput('stepMinute', 15);
    fixture.detectChanges();

    expect(component.isValueValid(new Date(2026, 6, 14, 13, 59, 0))).toBe(false);
    expect(component.isValueValid(new Date(2026, 6, 14, 14, 0, 0))).toBe(true);
    expect(component.isValueValid(new Date(2026, 6, 14, 14, 14, 0))).toBe(false);
    expect(component.isValueValid(new Date(2026, 6, 14, 14, 15, 0))).toBe(true);
    expect(component.isValueValid(new Date(2026, 6, 15, 10, 15, 0))).toBe(false);
  });

  it('normalizes invalid minute step configuration to 1', () => {
    for (const step of [0, -1, Number.NaN, 1.5, 61]) {
      fixture.componentRef.setInput('stepMinute', step);
      fixture.detectChanges();
      expect(component.stepMinute()).toBe(1);
    }
  });

  it('uses startAt, then adapter.today, as the date when time is selected first', () => {
    fixture.componentRef.setInput('startAt', new Date(2030, 2, 4, 5, 6, 7));
    fixture.detectChanges();
    component.selectTimePart(new Date(2000, 0, 1, 9, 15, 20));
    expect(component.selected()).toEqual(new Date(2030, 2, 4, 9, 15, 20));

    component.setValue(null);
    fixture.componentRef.setInput('startAt', null);
    jest.spyOn(TestBed.inject(SdNativeDateAdapter), 'today')
      .mockReturnValue(new Date(2040, 5, 6, 7, 8, 9));
    fixture.detectChanges();
    component.selectTimePart(new Date(2000, 0, 1, 10, 30, 40));
    expect(component.selected()).toEqual(new Date(2040, 5, 6, 10, 30, 40));
  });

  it('ignores a null calendar selection and blocks Apply for empty or invalid drafts', () => {
    const applied = jest.fn();
    component.applied.subscribe(applied);
    component.selectDatePart(null);
    component.apply();
    expect(applied).not.toHaveBeenCalled();

    fixture.componentRef.setInput('stepMinute', 15);
    fixture.detectChanges();
    component.select(new Date(2026, 4, 22, 14, 14, 0));
    expect(component.canApply()).toBe(false);
    component.apply();
    expect(applied).not.toHaveBeenCalled();
  });
});

describe('SdDatetimePicker default options', () => {
  it('uses injected defaults and lets explicit local inputs override them', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [SdDatetimePicker],
      providers: [
        provideSdNativeDateAdapter(),
        { provide: SD_DATETIME_DEFAULT_OPTIONS, useValue: { showSeconds: true, stepMinute: 15, touchUi: true } },
      ],
    });
    const localFixture = TestBed.createComponent(SdDatetimePicker<Date>);
    expect(localFixture.componentInstance.showSeconds()).toBe(true);
    expect(localFixture.componentInstance.stepMinute()).toBe(15);
    expect(localFixture.componentInstance.touchUi()).toBe(true);

    localFixture.componentRef.setInput('showSeconds', false);
    localFixture.componentRef.setInput('stepMinute', 5);
    localFixture.componentRef.setInput('touchUi', false);
    localFixture.detectChanges();
    expect(localFixture.componentInstance.showSeconds()).toBe(false);
    expect(localFixture.componentInstance.stepMinute()).toBe(5);
    expect(localFixture.componentInstance.touchUi()).toBe(false);
  });
});
