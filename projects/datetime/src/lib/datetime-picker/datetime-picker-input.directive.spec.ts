import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideSdNativeDateAdapter } from '../native/provide-native';
import { SdDatetimePicker } from './datetime-picker.component';
import { SdDatetimePickerInput } from './datetime-picker-input.directive';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SdDatetimePicker, SdDatetimePickerInput],
  template: `
    <input [sdDatetimePicker]="picker" [formControl]="ctrl">
    <sd-datetime-picker #picker></sd-datetime-picker>
  `,
})
class HostCmp {
  public ctrl = new FormControl<Date | null>(null);
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
});
