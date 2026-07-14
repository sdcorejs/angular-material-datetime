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

  combineDateAndTime(datePart: D, timePart: D): D {
    return this.createDatetime(
      this.getYear(datePart), this.getMonth(datePart), this.getDate(datePart),
      this.getHour(timePart), this.getMinute(timePart), this.getSecond(timePart),
    );
  }

  compareDatetime(first: D, second: D): number {
    const firstParts = [
      this.getYear(first), this.getMonth(first), this.getDate(first),
      this.getHour(first), this.getMinute(first), this.getSecond(first),
    ];
    const secondParts = [
      this.getYear(second), this.getMonth(second), this.getDate(second),
      this.getHour(second), this.getMinute(second), this.getSecond(second),
    ];
    for (let index = 0; index < firstParts.length; index += 1) {
      const difference = firstParts[index] - secondParts[index];
      if (difference !== 0) return difference < 0 ? -1 : 1;
    }
    return 0;
  }
}
