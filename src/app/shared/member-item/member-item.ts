import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Member } from '../../core/models';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-member-item',
  imports: [NgClass, RouterLink, Icon],
  templateUrl: './member-item.html',
  styleUrl: './member-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberItem {
  readonly member = input.required<Member>();
}
