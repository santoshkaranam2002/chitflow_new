import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TabOption } from '../../core/models';
import { PaymentService } from '../../core/services/payment.service';
import { CountUp } from '../../shared/count-up/count-up';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';
import { PaymentItem } from '../../shared/payment-item/payment-item';
import { InrPipe } from '../../shared/pipes/inr.pipe';
import { Tabs } from '../../shared/tabs/tabs';

@Component({
  selector: 'app-payments',
  imports: [RouterLink, CountUp, EmptyState, Icon, PageHeader, PaymentItem, InrPipe, Tabs],
  templateUrl: './payments.html',
  styleUrl: './payments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Payments {
  private readonly service = inject(PaymentService);

  protected readonly tab = signal('all');
  protected readonly bars = this.service.bars;
  protected readonly totalPaid = this.service.totalPaid;
  protected readonly maxBar = Math.max(...this.bars);
  protected readonly months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

  protected readonly tabs = computed<TabOption[]>(() => [
    { id: 'all', label: 'All Payments', count: this.service.payments().length },
    { id: 'pending', label: 'Pending', count: this.service.pending().length },
  ]);
  protected readonly visible = computed(() => (this.tab() === 'pending' ? this.service.pending() : this.service.payments()));
  protected readonly dueTotal = computed(() => this.service.pending().reduce((s, p) => s + p.amount, 0));
}
