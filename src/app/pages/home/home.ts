import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AuctionService } from '../../core/services/auction.service';
import { GroupService } from '../../core/services/group.service';
import { MemberService } from '../../core/services/member.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaymentService } from '../../core/services/payment.service';
import { UserService } from '../../core/services/user.service';
import { greeting } from '../../core/utils/date.util';
import { injectNow, pad, splitDuration } from '../../core/utils/time.util';
import { CountUp } from '../../shared/count-up/count-up';
import { Icon } from '../../shared/icon/icon';
import { IconTile } from '../../shared/icon-tile/icon-tile';
import { Logo } from '../../shared/logo/logo';
import { PaymentItem } from '../../shared/payment-item/payment-item';
import { InrPipe } from '../../shared/pipes/inr.pipe';
import { Sparkline } from '../../shared/sparkline/sparkline';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe, CountUp, Icon, IconTile, Logo, PaymentItem, InrPipe, Sparkline],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly groupService = inject(GroupService);
  private readonly auctionService = inject(AuctionService);
  private readonly now = injectNow(1000);
  private readonly members = inject(MemberService).members;
  private readonly allPayments = inject(PaymentService).payments;
  protected readonly user = inject(UserService);
  protected readonly unread = inject(NotificationService).unreadCount;

  protected readonly balance = this.groupService.totalBalance;
  protected readonly groups = this.groupService.mine;
  protected readonly totalMembers = computed(() => this.members().length * 13 + 2);
  protected readonly payments = computed(() => this.allPayments().filter((p) => p.status === 'Completed').slice(0, 3));
  protected readonly trend = [32, 38, 35, 46, 52, 49, 64, 71];
  protected readonly hello = greeting();
  protected readonly firstName = computed(() => this.user.profile().name.split(' ')[0]);

  /** Live auction first, otherwise the soonest upcoming one */
  protected readonly nextAuction = computed(() => {
    const list = this.auctionService.auctions();
    return list.find((a) => a.status === 'Live') ?? [...list].filter((a) => a.status === 'Upcoming').sort((a, b) => +new Date(a.date) - +new Date(b.date))[0];
  });
  protected readonly countdown = computed(() => {
    const a = this.nextAuction();
    if (!a) return '';
    const d = splitDuration(+new Date(a.date) - this.now());
    return d.days > 0 ? `${d.days}d ${pad(d.hours)}h ${pad(d.minutes)}m` : `${pad(d.hours)}:${pad(d.minutes)}:${pad(d.seconds)}`;
  });

  protected readonly actions = [
    { icon: 'card', label: 'Pay Dues', path: '/payments/make' },
    { icon: 'gavel', label: 'Auctions', path: '/auctions' },
    { icon: 'user', label: 'Members', path: '/members' },
    { icon: 'bar', label: 'Reports', path: '/reports' },
  ];
}
