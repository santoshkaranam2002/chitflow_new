import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { NotificationService } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';
import { Icon } from '../../shared/icon/icon';
import { Logo } from '../../shared/logo/logo';

interface SideLink { path: string; icon: string; label: string; badge?: boolean; }
interface SideSection { title: string; links: SideLink[]; }

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, Icon, Logo],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private readonly router = inject(Router);

  protected readonly user = inject(UserService).profile;
  protected readonly unread = inject(NotificationService).unreadCount;

  protected readonly sections: SideSection[] = [
    { title: 'Main', links: [{ path: '/home', icon: 'grid', label: 'Overview' }] },
    {
      title: 'Operations',
      links: [
        { path: '/groups', icon: 'users', label: 'Chit Groups' },
        { path: '/members', icon: 'user', label: 'Members' },
        { path: '/auctions', icon: 'gavel', label: 'Auctions' },
      ],
    },
    {
      title: 'Finance',
      links: [
        { path: '/payments', icon: 'card', label: 'Payments' },
        { path: '/reports', icon: 'file', label: 'Reports' },
      ],
    },
    {
      title: 'Account',
      links: [
        { path: '/notifications', icon: 'bell', label: 'Notifications', badge: true },
        { path: '/settings', icon: 'settings', label: 'Settings' },
        { path: '/profile', icon: 'user', label: 'Profile' },
        { path: '/help', icon: 'help', label: 'Help & Support' },
      ],
    },
  ];

  protected logout(): void {
    this.router.navigateByUrl('/login');
  }
}
