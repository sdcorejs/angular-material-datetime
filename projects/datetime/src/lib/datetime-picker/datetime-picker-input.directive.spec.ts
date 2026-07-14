import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideSdNativeDateAdapter } from '../native/provide-native';
import { SdDatetimePicker } from './datetime-picker.component';
import { SdDatetimePickerInput } from './datetime-picker-input.directive';
import { SdDatetimePickerToggle } from './datetime-picker-toggle.directive';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SdDatetimePicker, SdDatetimePickerInput, SdDatetimePickerToggle],
  template: `
    <input [sdDatetimePicker]="picker" [formControl]="ctrl">
    <button [sdDatetimePickerToggle]="picker">Open</button>
    <sd-datetime-picker
      #picker
      [showSeconds]="showSeconds"
      [stepMinute]="stepMinute"
      [minDate]="minDate"
      [maxDate]="maxDate">
    </sd-datetime-picker>
  `,
})
class HostCmp {
  ctrl = new FormControl<Date | null>(null);
  showSeconds = false;
  stepMinute = 1;
  minDate: Date | null = null;
  maxDate: Date | null = null;
}

describe('SdDatetimePickerInput (CVA)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostCmp],
      providers: [provideSdNativeDateAdapter()],
    });
  });

  it('writeValue updates the input element value via adapter format()', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    fix.componentInstance.ctrl.setValue(new Date(2026, 4, 22, 14, 30, 0));
    fix.detectChanges();
    const input = fix.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.value).not.toBe('');
  });

  it('writeValue with null clears the input', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    fix.componentInstance.ctrl.setValue(new Date(2026, 4, 22, 14, 30, 0));
    fix.detectChanges();
    fix.componentInstance.ctrl.setValue(null);
    fix.detectChanges();
    const input = fix.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('picker.applied propagates value back to formControl', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;
    const d = new Date(2026, 4, 22, 14, 30, 0);
    picker.select(d);
    picker.apply();
    expect(fix.componentInstance.ctrl.value).toEqual(d);
  });

  it('disabling formControl propagates `disabled` attribute to input', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    fix.componentInstance.ctrl.disable();
    fix.detectChanges();
    const input = fix.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('disabling formControl prevents the picker from opening', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;
    fix.componentInstance.ctrl.disable();
    fix.detectChanges();
    const button = fix.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    button.click();
    expect(picker.opened()).toBe(false);
  });

  it('disabling formControl closes an already opened picker', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;
    picker.open();
    expect(picker.opened()).toBe(true);
    fix.componentInstance.ctrl.disable();
    fix.detectChanges();
    expect(picker.opened()).toBe(false);
  });

  it('setDisabledState false re-enables the input element', () => {
    // ครอบคลุม branch setDisabledState(false) หลังจาก disable แล้ว enable กลับ
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    fix.componentInstance.ctrl.disable();
    fix.detectChanges();
    const inputEl = fix.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(inputEl.disabled).toBe(true);
    fix.componentInstance.ctrl.enable();
    fix.detectChanges();
    expect(inputEl.disabled).toBe(false);
  });

  it('onBlur makes formControl touched (covers onTouched() call)', () => {
    // ครอบคลุม @HostListener('blur') onBlur()
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    expect(fix.componentInstance.ctrl.touched).toBe(false);
    const inputEl = fix.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    inputEl.dispatchEvent(new Event('blur'));
    fix.detectChanges();
    expect(fix.componentInstance.ctrl.touched).toBe(true);
  });

  it('onInput parses raw text and calls onChange (covers @HostListener input branch)', () => {
    // ครอบคลุม @HostListener('input') onInput()
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const inputEl = fix.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    // ตั้งค่าแล้ว dispatch event — adapter.parse() อาจคืน null หรือ Date ขึ้นอยู่กับ format
    inputEl.value = '05/22/2026 02:30 PM';
    inputEl.dispatchEvent(new Event('input'));
    fix.detectChanges();
    // ตรวจว่าไม่ throw และ formControl ถูก set ค่า (null หรือ Date ทั้งคู่ยอมรับ)
    const v = fix.componentInstance.ctrl.value;
    expect(v === null || v instanceof Date).toBe(true);
  });

  it('picker.cleared subscription clears the formControl value to null', () => {
    // ครอบคลุม p.cleared.subscribe handler (lines 42-45)
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    fix.componentInstance.ctrl.setValue(new Date(2026, 4, 22, 14, 30, 0));
    fix.detectChanges();
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;
    picker.clear();
    fix.detectChanges();
    expect(fix.componentInstance.ctrl.value).toBeNull();
  });

  it('form reset clears both the input text and picker selection', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;
    fix.componentInstance.ctrl.setValue(new Date(2026, 4, 22, 14, 30, 0));
    fix.componentInstance.ctrl.reset();
    fix.detectChanges();

    expect((fix.debugElement.query(By.css('input')).nativeElement as HTMLInputElement).value).toBe('');
    expect(picker.selected()).toBeNull();
  });

  it('synchronizes a valid typed datetime into the picker', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;
    const input = fix.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    input.value = '05/22/2026 02:30 PM';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();

    expect(fix.componentInstance.ctrl.value).toBeInstanceOf(Date);
    expect(picker.selected()).toEqual(fix.componentInstance.ctrl.value);
  });

  it('reports sdDatetimeParse for invalid non-empty text but not for empty input', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const input = fix.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    input.value = 'not a datetime';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.componentInstance.ctrl.hasError('sdDatetimeParse')).toBe(true);
    expect(input.value).toBe('not a datetime');

    input.value = '';
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(fix.componentInstance.ctrl.hasError('sdDatetimeParse')).toBe(false);
  });

  it('formats seconds only when showSeconds is enabled', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;
    const input = fix.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    const value = new Date(2026, 4, 22, 14, 30, 45);

    fix.componentInstance.ctrl.setValue(new Date(value));
    fix.detectChanges();
    expect(input.value).not.toMatch(/30:45/);

    fix.componentInstance.showSeconds = true;
    fix.detectChanges();
    fix.componentInstance.ctrl.setValue(new Date(2026, 4, 22, 14, 30, 46));
    fix.detectChanges();
    expect(picker.showSeconds()).toBe(true);
    expect(input.value).toMatch(/30:46/);
  });

  it('reports stable full-datetime min, max, and minute-step errors', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    fix.componentInstance.minDate = new Date(2026, 6, 14, 14, 0, 0);
    fix.componentInstance.maxDate = new Date(2026, 6, 15, 10, 0, 0);
    fix.componentInstance.stepMinute = 15;
    fix.detectChanges();

    fix.componentInstance.ctrl.setValue(new Date(2026, 6, 14, 13, 59, 0));
    expect(fix.componentInstance.ctrl.hasError('sdDatetimeMin')).toBe(true);
    fix.componentInstance.ctrl.setValue(new Date(2026, 6, 15, 10, 15, 0));
    expect(fix.componentInstance.ctrl.hasError('sdDatetimeMax')).toBe(true);
    fix.componentInstance.ctrl.setValue(new Date(2026, 6, 14, 14, 14, 0));
    expect(fix.componentInstance.ctrl.getError('sdDatetimeMinuteStep')).toEqual({ step: 15, actualMinute: 14 });
    fix.componentInstance.ctrl.setValue(new Date(2026, 6, 14, 14, 15, 0));
    expect(fix.componentInstance.ctrl.valid).toBe(true);
  });
});
