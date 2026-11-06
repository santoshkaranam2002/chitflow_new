import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuctionService } from '../../core/services/auction.service';
import { GroupService } from '../../core/services/group.service';
import { ToastService } from '../../core/services/toast.service';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';
import { InrPipe } from '../../shared/pipes/inr.pipe';

@Component({
  selector: 'app-add-auction',
  imports: [FormsModule, Icon, PageHeader, InrPipe],
  templateUrl: './add-auction.html',
  styleUrl: './add-auction.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAuction {
  private readonly router = inject(Router);
  private readonly groupService = inject(GroupService);
  private readonly auctions = inject(AuctionService);
  private readonly toast = inject(ToastService);

  protected readonly groups = this.groupService.mine;
  protected readonly groupId = signal(this.groups()[0].id);
  protected readonly date = signal('2026-12-15');
  protected readonly time = signal('10:00');
  protected readonly minBid = signal(1000);
  protected readonly commission = signal(5);
  protected readonly notes = signal('');
  protected readonly rates = [3, 5, 7];

  protected readonly group = computed(() => this.groupService.byId(this.groupId()));
  protected readonly commissionAmount = computed(() => Math.round((this.group().value * this.commission()) / 100));

  protected schedule(): void {
    const g = this.group();
    this.auctions.schedule({
      groupId: g.id, name: g.name, value: g.value, date: new Date(`${this.date()}T${this.time()}`).toISOString(), total: g.members,
      minBid: this.minBid(), commission: this.commission(), icon: g.icon, bg: g.bg, color: g.color,
    });
    this.toast.show(`Auction scheduled for ${g.name}`, 'success', 'gavel');
    this.router.navigateByUrl('/auctions');
  }
}
