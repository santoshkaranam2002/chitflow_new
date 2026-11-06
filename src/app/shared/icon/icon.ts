import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { ICONS } from './icon.paths';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(20);
  readonly stroke = input(2);

  protected readonly paths = computed(() => (ICONS[this.name()] ?? '').split('|').filter(Boolean));
  protected readonly strokeWidth = computed(() => (this.name() === 'more' ? 3 : this.stroke()));
}
