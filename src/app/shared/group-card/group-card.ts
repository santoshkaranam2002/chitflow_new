import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChitGroup } from '../../core/models';
import { Icon } from '../icon/icon';
import { IconTile } from '../icon-tile/icon-tile';
import { InrPipe } from '../pipes/inr.pipe';

@Component({
  selector: 'app-group-card',
  imports: [RouterLink, DatePipe, Icon, IconTile, InrPipe],
  templateUrl: './group-card.html',
  styleUrl: './group-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCard {
  readonly group = input.required<ChitGroup>();

  protected readonly percent = computed(() => Math.round((this.group().paid / this.group().members) * 100));
  protected readonly isToday = computed(() => new Date(this.group().nextAuction).toDateString() === new Date().toDateString());
}
