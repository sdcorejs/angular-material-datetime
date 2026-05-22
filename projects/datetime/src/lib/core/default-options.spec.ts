import { InjectionToken } from '@angular/core';
import { SD_DATETIME_DEFAULT_OPTIONS, SdDatetimeDefaultOptions } from './default-options';

describe('SD_DATETIME_DEFAULT_OPTIONS', () => {
  it('is an InjectionToken', () => {
    expect(SD_DATETIME_DEFAULT_OPTIONS).toBeInstanceOf(InjectionToken);
  });

  it('typings expose showSeconds, stepMinute, touchUi, color', () => {
    const opts: SdDatetimeDefaultOptions = {
      showSeconds: true,
      stepMinute: 5,
      touchUi: false,
      color: 'primary',
    };
    expect(opts.showSeconds).toBe(true);
    expect(opts.stepMinute).toBe(5);
  });
});
