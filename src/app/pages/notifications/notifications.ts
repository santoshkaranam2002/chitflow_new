import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { AppNotification, TabOption } from '../../core/models';
import { NotificationService } from '../../core/services/notification.service';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { Icon } from '../../shared/icon/icon';
import { IconTile } from '../../shared/icon-tile/icon-tile';
import { PageHeader } from '../../shared/page-header/page-header';
import { Tabs } from '../../shared/tabs/tabs';

const TONE: Record<string, { bg: string; color: string }> = {
  auction: { bg: '#ffe6d8', color: '#f26a1b' },
  payment: { bg: '#dcf5e6', color: '#1b8a4b' },
  penalty: { bg: '#fde2e2', color: '#e5432d' },
  system: { bg: '#ece8fd', color: '#6c55d9' },
};

@Component({
  selector: 'app-notifications',
  imports: [EmptyState, Icon, IconTile, PageHeader, Tabs],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notifications {
  protected readonly service = inject(NotificationService);
  protected readonly tab = signal('all');

  protected readonly tabs = computed<TabOption[]>(() => [
    { id: 'all', label: 'All', count: this.service.items().length },
    { id: 'unread', label: 'Unread', count: this.service.unreadCount() },
  ]);
  protected readonly visible = computed(() => this.service.items().filter((n) => this.tab() === 'all' || !n.read));
  protected readonly sections = computed(() =>
    (['Today', 'Earlier'] as const)
      .map((title) => ({ title, items: this.visible().filter((n) => n.section === title) }))
      .filter((s) => s.items.length),
  );

  protected tone(n: AppNotification) {
    return TONE[n.kind];
  }
}
