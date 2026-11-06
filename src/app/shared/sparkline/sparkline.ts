import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-sparkline',
  templateUrl: './sparkline.html',
  styleUrl: './sparkline.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sparkline {
  readonly values = input.required<number[]>();
  readonly width = input(120);
  readonly height = input(44);

  private readonly pts = computed(() => {
    const v = this.values();
    const max = Math.max(...v);
    const min = Math.min(...v);
    const span = max - min || 1;
    return v.map((n, i) => ({ x: (i / Math.max(v.length - 1, 1)) * this.width(), y: this.height() - 4 - ((n - min) / span) * (this.height() - 10) }));
  });
  protected readonly line = computed(() => this.pts().map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '));
  protected readonly area = computed(() => `${this.line()} L${this.width()} ${this.height()} L0 ${this.height()} Z`);
  protected readonly last = computed(() => this.pts().at(-1) ?? { x: 0, y: 0 });
}
