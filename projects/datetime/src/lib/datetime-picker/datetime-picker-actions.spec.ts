import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideSdNativeDateAdapter } from '../native/provide-native';
import { SdDatetimePicker } from './datetime-picker.component';
import { SdDatetimePickerActions } from './datetime-picker-actions.component';
import { SdDatetimePickerApply } from './datetime-picker-apply.directive';
import { SdDatetimePickerCancel } from './datetime-picker-cancel.directive';
import { SdDatetimePickerNow } from './datetime-picker-now.directive';

@Component({
  standalone: true,
  imports: [SdDatetimePicker, SdDatetimePickerActions, SdDatetimePickerApply, SdDatetimePickerCancel],
  template: `
    <sd-datetime-picker #p>
      <sd-datetime-picker-actions>
        <button sdDatetimePickerCancel>Cancel</button>
        <button sdDatetimePickerApply>Apply</button>
      </sd-datetime-picker-actions>
    </sd-datetime-picker>
  `,
})
class HostCmp {}

describe('SdDatetimePickerActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostCmp],
      providers: [provideSdNativeDateAdapter()],
    });
  });

  it('Apply directive emits applied event with selected value', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;
    const chosen = new Date(2026, 4, 22, 14, 30, 0);
    picker.select(chosen);
    picker.open();
    fix.detectChanges();
    const spy = jest.fn();
    picker.applied.subscribe(spy);
    const btn = fix.debugElement.query(By.css('[sdDatetimePickerApply]')).nativeElement as HTMLElement;
    btn.click();
    expect(spy).toHaveBeenCalledWith(chosen);
  });

  it('Cancel directive closes the picker without applying', () => {
    const fix = TestBed.createComponent(HostCmp);
    fix.detectChanges();
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;
    picker.open();
    fix.detectChanges();
    const appliedSpy = jest.fn();
    picker.applied.subscribe(appliedSpy);
    const btn = fix.debugElement.query(By.css('[sdDatetimePickerCancel]')).nativeElement as HTMLElement;
    btn.click();
    expect(picker.opened()).toBe(false);
    expect(appliedSpy).not.toHaveBeenCalled();
  });

});

describe('SdDatetimePickerNow', () => {
  it('Now directive sets selected to current Date (popup stays open)', () => {
    @Component({
      standalone: true,
      imports: [SdDatetimePicker, SdDatetimePickerActions, SdDatetimePickerNow],
      template: `
        <sd-datetime-picker #p>
          <sd-datetime-picker-actions>
            <button sdDatetimePickerNow>Now</button>
          </sd-datetime-picker-actions>
        </sd-datetime-picker>
      `,
    })
    class NowHostCmp {}

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [NowHostCmp],
      providers: [provideSdNativeDateAdapter()],
    });

    const fix = TestBed.createComponent(NowHostCmp);
    fix.detectChanges();
    const picker = fix.debugElement.query(By.directive(SdDatetimePicker)).componentInstance as SdDatetimePicker<Date>;

    picker.open();
    fix.detectChanges();

    expect(picker.selected()).toBeNull();
    const before = Date.now();
    const btn = fix.debugElement.query(By.css('[sdDatetimePickerNow]')).nativeElement as HTMLElement;
    btn.click();
    const after = Date.now();

    const sel = picker.selected();
    expect(sel).toBeInstanceOf(Date);
    expect(sel!.getTime()).toBeGreaterThanOrEqual(before);
    expect(sel!.getTime()).toBeLessThanOrEqual(after);

    // Popup stays open after clicking Now
    expect(picker.opened()).toBe(true);
  });
});
