import { DateAdapter } from '@angular/material/core';

export abstract class SdDateAdapter<D> extends DateAdapter<D> {
  abstract getHour(date: D): number;
  abstract getMinute(date: D): number;
  abstract getSecond(date: D): number;

  abstract setHour(date: D, hour: number): D;
  abstract setMinute(date: D, minute: number): D;
  abstract setSecond(date: D, second: number): D;

  abstract createDatetime(
    year: number, month: number, date: number,
    hour: number, minute: number, second: number,
  ): D;
}
