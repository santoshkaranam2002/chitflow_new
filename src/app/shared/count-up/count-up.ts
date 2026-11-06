import { Directive, ElementRef, effect, inject, input } from '@angular/core';

/** Animates a number from 0 to its value:  <b [appCountUp]="45000" prefix="₹ "></b> */
@Directive({ selector: '[appCountUp]' })
export class CountUp {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly value = input.required<number>({ alias: 'appCountUp' });
  readonly prefix = input('');
  readonly suffix = input('');
  readonly duration = input(1100);
  readonly decimals = input(0);

  private frame = 0;
  private from = 0;

  constructor() {
    effect((onCleanup) => {
      const to = this.value();
      const from = this.from;
      const duration = this.duration();
      const start = performance.now();
      const render = (n: number) => {
        this.from = n;
        this.el.nativeElement.textContent =
          this.prefix() + n.toLocaleString('en-IN', { minimumFractionDigits: this.decimals(), maximumFractionDigits: this.decimals() }) + this.suffix();
      };
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        render(from + (to - from) * (1 - Math.pow(1 - t, 4)));
        if (t < 1) this.frame = requestAnimationFrame(step);
      };
      this.frame = requestAnimationFrame(step);
      onCleanup(() => cancelAnimationFrame(this.frame));
    });
  }
}
