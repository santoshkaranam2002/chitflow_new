import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

let uid = 0;

@Component({
  selector: 'app-progress-ring',
  imports: [DecimalPipe],
  templateUrl: './progress-ring.html',
  styleUrl: './progress-ring.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressRing {
  /** 0 – 100 */
  readonly value = input.required<number>();
  readonly size = input(64);
  readonly thickness = input(7);
  readonly label = input('');
  /** Use white strokes (for gradient backgrounds) */
  readonly light = input(false);

  protected readonly gradientId = `cf-ring-${uid++}`;
  protected readonly radius = computed(() => (this.size() - this.thickness()) / 2);
  protected readonly circumference = computed(() => 2 * Math.PI * this.radius());
  protected readonly offset = computed(() => this.circumference() * (1 - Math.min(100, Math.max(0, this.value())) / 100));
}
