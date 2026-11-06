import { DestroyRef, ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Bid } from '../../core/models';
import { AuctionService } from '../../core/services/auction.service';
import { ToastService } from '../../core/services/toast.service';
import { pad } from '../../core/utils/time.util';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';
import { InrPipe } from '../../shared/pipes/inr.pipe';
import { ProgressRing } from '../../shared/progress-ring/progress-ring';

const TOTAL_SECONDS = 165;

@Component({
  selector: 'app-live-auction',
  imports: [FormsModule, Icon, PageHeader, InrPipe, ProgressRing],
  templateUrl: './live-auction.html',
  styleUrl: './live-auction.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveAuction {
  private readonly service = inject(AuctionService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly id = input<string>();

  protected readonly auction = computed(() => this.service.byId(this.id() ?? 'a2'));
  protected readonly bids = signal<Bid[]>(this.service.seedBids);
  protected readonly top = computed(() => this.bids()[0]);
  protected readonly bidInput = signal(11000);
  protected readonly seconds = signal(TOTAL_SECONDS);
  protected readonly watching = signal(12);
  protected readonly pulse = signal(0);
  protected readonly quick = [500, 1000, 2000];

  protected readonly clock = computed(() => `${pad(Math.floor(this.seconds() / 60))}:${pad(this.seconds() % 60)}`);
  protected readonly timeLeftPercent = computed(() => (this.seconds() / TOTAL_SECONDS) * 100);
  protected readonly closed = computed(() => this.seconds() === 0);
  protected readonly urgent = computed(() => this.seconds() <= 30 && !this.closed());
  protected readonly youLeading = computed(() => this.top().isYou);

  private nextId = 100;

  constructor() {
    const tick = setInterval(() => this.seconds.update((s) => Math.max(0, s - 1)), 1000);
    // Simulated rival bidders keep the auction feeling alive
    const rival = setInterval(() => {
      if (this.closed()) return;
      const names = this.service.bidderNames;
      const amount = this.top().amount + (Math.random() < 0.5 ? 500 : 1000);
      this.addBid(names[Math.floor(Math.random() * names.length)], amount, false);
      this.watching.update((w) => Math.max(8, w + (Math.random() < 0.5 ? -1 : 1)));
      if (this.top().amount >= this.bidInput()) this.bidInput.set(this.top().amount + 1000);
      this.toast.show(`${this.top().name} bid ₹${amount.toLocaleString('en-IN')}`, 'info', 'gavel');
    }, 9000);
    inject(DestroyRef).onDestroy(() => { clearInterval(tick); clearInterval(rival); });
  }

  protected raise(by: number): void {
    this.bidInput.set(Math.max(this.bidInput(), this.top().amount) + by);
  }

  protected place(): void {
    if (this.closed()) return;
    const amount = Math.max(this.bidInput(), this.top().amount + this.auction().minBid);
    this.addBid('Santosh Karanam', amount, true);
    this.bidInput.set(amount + 1000);
    this.toast.show(`Your bid of ₹${amount.toLocaleString('en-IN')} is the highest!`, 'success', 'trophy');
  }

  protected declare(): void {
    this.service.declare(this.auction(), this.top().isYou ? `${this.top().name} (You)` : this.top().name, this.top().amount);
    this.router.navigateByUrl('/auctions/result');
  }

  private addBid(name: string, amount: number, isYou: boolean): void {
    const time = new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }).toUpperCase();
    this.bids.update((list) => [{ id: this.nextId++, name, amount, isYou, time }, ...list]);
    this.pulse.update((n) => n + 1);
  }
}
