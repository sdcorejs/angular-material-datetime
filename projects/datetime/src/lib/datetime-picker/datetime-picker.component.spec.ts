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

  it('open() is no-op when already opened (covers disabled || opened branch)', () => {
    // เปิดครั้งแรก ผ่าน → เปิดครั้งที่สองต้อง return ทันที
    component.open();
    expect(component.opened()).toBe(true);
    // เรียก open() อีกครั้ง — ต้องไม่ throw และยังคง opened = true
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
