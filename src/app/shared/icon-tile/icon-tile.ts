import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Icon } from '../icon/icon';

@Component({
  selector: 'app-icon-tile',
  imports: [Icon],
  templateUrl: './icon-tile.html',
  styleUrl: './icon-tile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconTile {
  readonly icon = input.required<string>();
  readonly bg = input('#ffe6d8');
  readonly color = input('#f26a1b');
  readonly size = input(42);
}
