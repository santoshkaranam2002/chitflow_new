import { ChangeDetectionStrategy, Component, input } from '@angular/core';

interface Piece { left: number; delay: number; duration: number; size: number; dx: number; rot: number; color: string; round: boolean; }

const COLORS = ['#ff4d1c', '#f97316', '#ffc24b', '#22a55b', '#2b8ad6', '#6c55d9', '#ff7eb6'];

/** Deterministic pseudo random so the pieces never change between renders. */
const rnd = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

@Component({
  selector: 'app-confetti',
  templateUrl: './confetti.html',
  styleUrl: './confetti.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Confetti {
  readonly count = input(34);

  protected get pieces(): Piece[] {
    return Array.from({ length: this.count() }, (_, i) => ({
      left: rnd(i + 1) * 100,
      delay: rnd(i + 50) * 0.9,
      duration: 2.2 + rnd(i + 90) * 1.8,
      size: 6 + rnd(i + 130) * 7,
      dx: (rnd(i + 170) - 0.5) * 120,
      rot: 360 + rnd(i + 210) * 720,
      color: COLORS[i % COLORS.length],
      round: i % 3 === 0,
    }));
  }
}
