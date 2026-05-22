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
