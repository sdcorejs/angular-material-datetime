import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SdDatetimeIntl {
  readonly changes = new Subject<void>();

  dialogLabel = 'Choose date and time';
  nowLabel = 'Now';
  cancelLabel = 'Cancel';
  applyLabel = 'Apply';
  hourLabel = 'Hour';
  minuteLabel = 'Minute';
  secondLabel = 'Second';
  incrementHourLabel = 'Increment hour';
  decrementHourLabel = 'Decrement hour';
  incrementMinuteLabel = 'Increment minute';
  decrementMinuteLabel = 'Decrement minute';
  incrementSecondLabel = 'Increment second';
  decrementSecondLabel = 'Decrement second';
}
