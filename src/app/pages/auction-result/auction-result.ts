import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LabelValue } from '../../core/models';
import { AuctionService } from '../../core/services/auction.service';
import { ToastService } from '../../core/services/toast.service';
import { Confetti } from '../../shared/confetti/confetti';
import { CountUp } from '../../shared/count-up/count-up';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-auction-result',
  imports: [RouterLink, Confetti, CountUp, Icon, PageHeader],
  templateUrl: './auction-result.html',
  styleUrl: './auction-result.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuctionResult {
  private readonly toast = inject(ToastService);

  protected readonly result = inject(AuctionService).result;
  protected readonly prize = computed(() => this.result().chitValue - this.result().discount);
  protected readonly dividend = computed(() => Math.round((this.result().discount - this.result().commission) / this.result().members));
  protected readonly rows = computed<LabelValue[]>(() => {
    const r = this.result();
    const f = (n: number) => `₹${n.toLocaleString('en-IN')}`;
    return [
      { label: 'Group', value: r.group },
      { label: 'Chit value', value: f(r.chitValue) },
      { label: 'Winning discount', value: f(r.discount) },
      { label: 'Prize amount', value: f(this.prize()) },
      { label: 'Foreman commission', value: f(r.commission) },
      { label: 'Dividend per member', value: f(this.dividend()) },
    ];
  });

  protected share(): void {
    this.toast.show('Result shared with all members', 'success', 'share');
  }
}
