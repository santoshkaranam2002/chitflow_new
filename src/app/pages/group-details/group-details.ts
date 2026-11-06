import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconLabel } from '../../core/models';
import { GroupService } from '../../core/services/group.service';
import { PaymentService } from '../../core/services/payment.service';
import { ToastService } from '../../core/services/toast.service';
import { CountUp } from '../../shared/count-up/count-up';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';
import { PaymentItem } from '../../shared/payment-item/payment-item';
import { InrPipe } from '../../shared/pipes/inr.pipe';
import { ProgressRing } from '../../shared/progress-ring/progress-ring';

@Component({
  selector: 'app-group-details',
  imports: [DatePipe, RouterLink, CountUp, Icon, PageHeader, PaymentItem, InrPipe, ProgressRing],
  templateUrl: './group-details.html',
  styleUrl: './group-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupDetails {
  private readonly groups = inject(GroupService);
  private readonly toast = inject(ToastService);

  /** Bound from the ?id= query param */
  readonly id = input<string>();

  protected readonly group = computed(() => this.groups.byId(this.id()));
  protected readonly recent = inject(PaymentService).groupRecent;
  protected readonly percent = computed(() => Math.round((this.group().paid / this.group().members) * 100));
  protected readonly months = computed(() => Array.from({ length: this.group().duration }, (_, i) => i + 1));
  protected readonly overview = computed<IconLabel[]>(() => {
    const g = this.group();
    return [
      { icon: 'users', label: 'Total Members', value: String(g.members) },
      { icon: 'card', label: 'Monthly Contribution', value: `₹${g.monthly.toLocaleString('en-IN')}` },
      { icon: 'wallet', label: 'Total Amount', value: `₹${g.value.toLocaleString('en-IN')}` },
      { icon: 'clock', label: 'Duration', value: `${g.duration} Months` },
      { icon: 'percent', label: 'Foreman Commission', value: `${g.commission}%` },
    ];
  });

  protected invite(): void {
    this.toast.show('Invite link copied', 'success', 'copy');
  }

  protected calendar(): void {
    this.toast.show('Auction added to your calendar', 'success', 'cal');
  }
}
