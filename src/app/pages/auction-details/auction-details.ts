import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LabelValue } from '../../core/models';
import { AuctionService } from '../../core/services/auction.service';
import { ToastService } from '../../core/services/toast.service';
import { injectNow, pad, splitDuration } from '../../core/utils/time.util';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';
import { InrPipe } from '../../shared/pipes/inr.pipe';

@Component({
  selector: 'app-auction-details',
  imports: [NgClass, RouterLink, Icon, PageHeader, InrPipe],
  templateUrl: './auction-details.html',
  styleUrl: './auction-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuctionDetails {
  private readonly service = inject(AuctionService);
  private readonly toast = inject(ToastService);
  private readonly now = injectNow(1000);

  readonly id = input<string>();

  protected readonly auction = computed(() => this.service.byId(this.id()));
  protected readonly reminderOn = computed(() => !!this.service.reminders()[this.auction().id]);
  protected readonly parts = computed(() => {
    const d = splitDuration(+new Date(this.auction().date) - this.now());
    return [
      { label: 'Days', value: pad(d.days) },
      { label: 'Hours', value: pad(d.hours) },
      { label: 'Mins', value: pad(d.minutes) },
      { label: 'Secs', value: pad(d.seconds) },
    ];
  });
  protected readonly info = computed<LabelValue[]>(() => {
    const a = this.auction();
    return [
      { label: 'Date & time', value: new Date(a.date).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }).replace(',', ' •').replace(/\b(am|pm)\b/, (m) => m.toUpperCase()) },
      { label: 'Total members', value: String(a.total) },
      { label: 'Minimum bid', value: `₹${a.minBid.toLocaleString('en-IN')}` },
      { label: 'Commission', value: `${a.commission}%` },
    ];
  });

  protected statusClass(s: string): string {
    return s === 'Live' ? 'pill--live' : s === 'Completed' ? 'pill--dn' : 'pill--up';
  }

  protected remind(): void {
    const on = this.service.toggleReminder(this.auction().id);
    this.toast.show(on ? 'Reminder set – we will alert you 30 min before' : 'Reminder removed', on ? 'success' : 'info', 'bell');
  }
}
