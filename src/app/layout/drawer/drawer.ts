import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { DRAWER_MENU } from '../../core/data/mock-data';
import { NotificationService } from '../../core/services/notification.service';
import { ThemeService } from '../../core/services/theme.service';
import { UserService } from '../../core/services/user.service';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-drawer',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer {
  private readonly router = inject(Router);

  protected readonly menu = DRAWER_MENU;
  protected readonly user = inject(UserService).profile;
  protected readonly unread = inject(NotificationService).unreadCount;
  protected readonly theme = inject(ThemeService);

  readonly open = input(false);
  readonly closed = output<void>();

  protected logout(): void {
    this.closed.emit();
    this.router.navigateByUrl('/login');
  }
}
