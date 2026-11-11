import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChitGroup } from '../../core/models';
import { daysLabel } from '../../core/utils/date.util';
import { Icon } from '../icon/icon';
import { IconTile } from '../icon-tile/icon-tile';
import { InrPipe } from '../pipes/inr.pipe';
import { ProgressRing } from '../progress-ring/progress-ring';

@Component({
  selector: 'app-group-card',
  imports: [RouterLink, DatePipe, Icon, IconTile, InrPipe, ProgressRing],
  templateUrl: './group-card.html',
  styleUrl: './group-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCard {
  readonly group = input.required<ChitGroup>();

  protected readonly percent = computed(() => Math.round((this.group().paid / this.group().members) * 100));
  protected readonly isToday = computed(() => new Date(this.group().nextAuction).toDateString() === new Date().toDateString());
  protected readonly when = computed(() => (this.isToday() ? 'Today' : daysLabel(this.group().nextAuction)));
}