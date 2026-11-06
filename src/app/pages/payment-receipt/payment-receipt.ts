import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LabelValue } from '../../core/models';
import { PaymentService } from '../../core/services/payment.service';
import { ToastService } from '../../core/services/toast.service';
import { Confetti } from '../../shared/confetti/confetti';
import { CountUp } from '../../shared/count-up/count-up';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-payment-receipt',
  imports: [DatePipe, RouterLink, Confetti, CountUp, Icon, PageHeader],
  templateUrl: './payment-receipt.html',
  styleUrl: './payment-receipt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentReceipt {
  private readonly service = inject(PaymentService);
  private readonly toast = inject(ToastService);

  /** Optional ?id= – defaults to the most recent payment */
  readonly id = input<string>();

  protected readonly receipt = computed(() => this.service.byId(this.id()) ?? this.service.lastReceipt());
  protected readonly rows = computed<LabelValue[]>(() => {
    const r = this.receipt();
    return [
      { label: 'Type', value: r.title },
      { label: 'Group', value: r.subtitle },
      { label: 'Date', value: new Date(r.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
      { label: 'Method', value: r.method },
      { label: 'Transaction ID', value: r.txnId },
      { label: 'Status', value: r.status },
    ];
  });

  protected download(): void {
    this.toast.show('Receipt saved to downloads', 'success', 'download');
  }

  protected async share(): Promise<void> {
    const r = this.receipt();
    const text = `ChitFlow receipt – ₹${r.amount.toLocaleString('en-IN')} paid to ${r.subtitle} (Txn ${r.txnId})`;
    try {
      if (navigator.share) { await navigator.share({ title: 'ChitFlow receipt', text }); return; }
      await navigator.clipboard.writeText(text);
      this.toast.show('Receipt details copied', 'success', 'copy');
    } catch {
      this.toast.show('Receipt details ready to share', 'info', 'share');
    }
  }
}
