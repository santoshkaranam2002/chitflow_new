import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';

import { TabOption } from '../../core/models';

/** Segmented control with a sliding gradient indicator. Two-way bind with [(value)]. */
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tabs {
  readonly options = input.required<TabOption[]>();
  readonly value = model.required<string>();
  readonly small = input(false);

  protected readonly index = computed(() => Math.max(0, this.options().findIndex((o) => o.id === this.value())));
}
