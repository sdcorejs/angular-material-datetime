import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideSdNativeDateAdapter } from '../native/provide-native';
import { SdDatetimePicker } from './datetime-picker.component';

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
});
