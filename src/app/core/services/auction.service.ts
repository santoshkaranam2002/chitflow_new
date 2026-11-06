import { Injectable, signal } from '@angular/core';

import { AUCTIONS, BIDS, BIDDER_NAMES } from '../data/mock-data';
import { Auction, AuctionResult, Bid } from '../models';

@Injectable({ providedIn: 'root' })
export class AuctionService {
  readonly auctions = signal<Auction[]>(AUCTIONS);
  readonly seedBids: Bid[] = BIDS;
  readonly bidderNames = BIDDER_NAMES;
  readonly reminders = signal<Record<string, boolean>>({});
  readonly result = signal<AuctionResult>({
    group: 'Gold Plus', chitValue: 50000, winner: 'Santosh Karanam (You)', discount: 10000, commission: 2500, members: 15,
  });

  byId(id?: string | null): Auction {
    return this.auctions().find((a) => a.id === id) ?? this.auctions()[0];
  }

  schedule(input: Omit<Auction, 'id' | 'status' | 'paid'>): Auction {
    const auction: Auction = { ...input, id: `a${this.auctions().length + 1}`, status: 'Upcoming', paid: 0 };
    this.auctions.update((list) => [auction, ...list]);
    return auction;
  }

  toggleReminder(id: string): boolean {
    const next = !this.reminders()[id];
    this.reminders.update((r) => ({ ...r, [id]: next }));
    return next;
  }

  declare(auction: Auction, winner: string, discount: number): void {
    this.result.set({
      group: auction.name, chitValue: auction.value, winner, discount,
      commission: Math.round((auction.value * auction.commission) / 100), members: auction.total,
    });
  }
}
