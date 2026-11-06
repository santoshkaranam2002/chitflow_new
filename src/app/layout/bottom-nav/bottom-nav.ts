import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NAV_ITEMS } from '../../core/data/mock-data';
import { NotificationService } from '../../core/services/notification.service';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNav {
  protected readonly items = NAV_ITEMS;
  protected readonly unread = inject(NotificationService).unreadCount;
  readonly more = output<void>();
}
