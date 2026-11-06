import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PaymentMethod } from '../../core/models';
import { GroupService } from '../../core/services/group.service';
import { PaymentService } from '../../core/services/payment.service';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';
import { InrPipe } from '../../shared/pipes/inr.pipe';

@Component({
  selector: 'app-make-payment',
  imports: [FormsModule, Icon, PageHeader, InrPipe],
  templateUrl: './make-payment.html',
  styleUrl: './make-payment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakePayment {
  private readonly router = inject(Router);
  private readonly groupService = inject(GroupService);
  private readonly payments = inject(PaymentService);

  /** Optional ?id= of a pending payment – pre-selects its group */
  readonly id = input<string>();

  protected readonly groups = this.groupService.mine;
  protected readonly groupId = signal(this.groups()[0].id);
  protected readonly group = computed(() => this.groupService.byId(this.groupId()));
  protected readonly amount = signal(this.groups()[0].monthly);
  protected readonly method = signal<PaymentMethod>('UPI');
  protected readonly note = signal('');
  protected readonly processing = signal(false);

  protected readonly methods: { id: PaymentMethod; icon: string; hint: string }[] = [
    { id: 'UPI', icon: 'bolt', hint: 'Instant' },
    { id: 'Card', icon: 'card', hint: 'Credit / Debit' },
    { id: 'Net Banking', icon: 'bank', hint: 'All banks' },
    { id: 'Cash', icon: 'cash', hint: 'Pay foreman' },
  ];

  constructor() {
    effect(() => {
      const pending = this.payments.byId(this.id());
      if (!pending) return;
      const g = untracked(() => this.groups().find((x) => x.name === pending.subtitle));
      if (g) { this.groupId.set(g.id); this.amount.set(pending.amount); }
    });
  }

  protected pick(id: string): void {
    this.groupId.set(id);
    this.amount.set(this.group().monthly);
  }

  protected pay(): void {
    this.processing.set(true);
    setTimeout(() => {
      this.payments.pay(this.group(), this.amount(), this.method());
      this.router.navigateByUrl('/payments/receipt');
    }, 1400);
  }
}
