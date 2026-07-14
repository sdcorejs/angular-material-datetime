import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideSdNativeDateAdapter } from '../native/provide-native';
import { SdDatetimePicker } from './datetime-picker.component';
import { SdDatetimePickerToggle } from './datetime-picker-toggle.directive';

@Component({
  standalone: true,
  imports: [SdDatetimePicker, SdDatetimePickerToggle],
  template: `
    <button [sdDatetimePickerToggle]="picker">Open</button>
    <sd-datetime-picker #picker></sd-datetime-picker>
  `,
})
class HostCmp {}

describe('SdDatetimePickerToggle', () => {
  it('click opens the bound picker', () => {
    TestBed.configureTestingModule({ imports: [HostCmp], providers: [provideSdNativeDateAdapter()] });
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;
    expect(picker.opened()).toBe(false);
    fix.debugElement.query(By.css('button')).nativeElement.click();
    expect(picker.opened()).toBe(true);
  });

  it('click closes the picker when already opened (covers the p.opened()===true branch)', () => {
    TestBed.configureTestingModule({ imports: [HostCmp], providers: [provideSdNativeDateAdapter()] });
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;
    // เปิดก่อน แล้วกดอีกครั้งเพื่อปิด
    fix.debugElement.query(By.css('button')).nativeElement.click();
    expect(picker.opened()).toBe(true);
    fix.debugElement.query(By.css('button')).nativeElement.click();
    expect(picker.opened()).toBe(false);
  });

  it('updates aria-expanded/controls and restores focus when closed', () => {
    TestBed.configureTestingModule({ imports: [HostCmp], providers: [provideSdNativeDateAdapter()] });
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const button = fix.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(button.getAttribute('aria-controls')).toBe(picker.panelId);

    button.focus();
    button.click();
    fix.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    picker.cancel();
    fix.detectChanges();
    expect(document.activeElement).toBe(button);
  });
});
