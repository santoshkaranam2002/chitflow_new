import { Injectable, computed, signal } from '@angular/core';

import { GROUP_RECENT_PAYMENTS, PAYMENTS, PAYMENT_BARS } from '../data/mock-data';
import { ChitGroup, Payment, PaymentMethod } from '../models';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  readonly payments = signal<Payment[]>(PAYMENTS);
  readonly groupRecent: Payment[] = GROUP_RECENT_PAYMENTS;
  readonly bars = PAYMENT_BARS;
  readonly pending = computed(() => this.payments().filter((p) => p.status === 'Pending'));
  readonly totalPaid = computed(() =>
    this.payments().filter((p) => p.status === 'Completed' && p.sign === '+').reduce((sum, p) => sum + p.amount, 0) + 35000,
  );
  /** Most recent payment – shown on the receipt screen */
  readonly lastReceipt = signal<Payment>(PAYMENTS[0]);

  byId(id?: string | null): Payment | undefined {
    return this.payments().find((p) => p.id === id);
  }

  pay(group: ChitGroup, amount: number, method: PaymentMethod): Payment {
    const payment: Payment = {
      id: `p${Date.now()}`,
      title: 'Monthly Contribution',
      subtitle: group.name,
      date: new Date().toISOString(),
      amount,
      sign: '+',
      icon: 'up',
      bg: '#dcf5e6',
      color: '#1b8a4b',
      status: 'Completed',
      method,
      txnId: `CF${Math.floor(70000 + Math.random() * 29999)}`,
    };
    this.payments.update((list) => [payment, ...list]);
    this.lastReceipt.set(payment);
    return payment;
  }
}
