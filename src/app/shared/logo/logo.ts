import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Icon } from '../icon/icon';

@Component({
  selector: 'app-logo',
  imports: [Icon],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  readonly size = input(40);
  /** Adds a soft pulsing halo (used on the login screen) */
  readonly glow = input(false);
}
