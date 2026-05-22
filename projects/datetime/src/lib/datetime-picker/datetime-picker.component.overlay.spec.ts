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
