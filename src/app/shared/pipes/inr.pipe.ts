import { Pipe, PipeTransform } from '@angular/core';

/** 100000 -> "1,00,000" (Indian digit grouping) */
@Pipe({ name: 'inr' })
export class InrPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    return (value ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }
}
