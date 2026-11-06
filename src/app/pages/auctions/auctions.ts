import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TabOption } from '../../core/models';
import { AuctionService } from '../../core/services/auction.service';
import { ToastService } from '../../core/services/toast.service';
import { injectNow, pad, splitDuration } from '../../core/utils/time.util';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { Icon } from '../../shared/icon/icon';
import { IconTile } from '../../shared/icon-tile/icon-tile';
import { PageHeader } from '../../shared/page-header/page-header';
import { InrPipe } from '../../shared/pipes/inr.pipe';
import { Tabs } from '../../shared/tabs/tabs';

@Component({
  selector: 'app-auctions',
  imports: [DatePipe, NgClass, RouterLink, EmptyState, Icon, IconTile, PageHeader, InrPipe, Tabs],
  templateUrl: './auctions.html',
  styleUrl: './auctions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Auctions {
  private readonly service = inject(AuctionService);
  private readonly toast = inject(ToastService);
  private readonly now = injectNow(1000);

  protected readonly tab = signal('all');

  protected readonly tabs = computed<TabOption[]>(() => {
    const list = this.service.auctions();
    return [
      { id: 'all', label: 'All', count: list.length },
      { id: 'Live', label: 'Live', count: list.filter((a) => a.status === 'Live').length },
      { id: 'Upcoming', label: 'Upcoming', count: list.filter((a) => a.status === 'Upcoming').length },
      { id: 'Completed', label: 'Done', count: list.filter((a) => a.status === 'Completed').length },
    ];
  });

  protected readonly featured = computed(() => {
    const list = this.service.auctions();
    return list.find((a) => a.status === 'Live') ?? list.filter((a) => a.status === 'Upcoming').sort((a, b) => +new Date(a.date) - +new Date(b.date))[0];
  });
  protected readonly visible = computed(() =>
    this.service.auctions().filter((a) => (this.tab() === 'all' || a.status === this.tab()) && a.id !== (this.tab() === 'all' ? this.featured()?.id : '')),
  );
  protected readonly countdown = computed(() => {
    const f = this.featured();
    if (!f) return '';
    const d = splitDuration(+new Date(f.date) - this.now());
    return d.days > 0 ? `${d.days}d ${pad(d.hours)}h ${pad(d.minutes)}m` : `${pad(d.hours)}:${pad(d.minutes)}:${pad(d.seconds)}`;
  });

  protected calendar(): void {
    this.toast.show('Synced with your calendar', 'success', 'cal');
  }

  protected statusClass(status: string): string {
    return status === 'Live' ? 'pill--live' : status === 'Completed' ? 'pill--dn' : 'pill--up';
  }
}
