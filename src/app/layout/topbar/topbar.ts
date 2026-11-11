import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { NotificationService } from '../../core/services/notification.service';
import { ThemeService } from '../../core/services/theme.service';
import { UserService } from '../../core/services/user.service';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-topbar',
  imports: [FormsModule, RouterLink, Icon],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Topbar {
  private readonly router = inject(Router);

  protected readonly theme = inject(ThemeService);
  protected readonly user = inject(UserService).profile;
  protected readonly unread = inject(NotificationService).unreadCount;
  protected readonly query = signal('');

  protected search(): void {
    this.router.navigate(['/groups']);
  }
}
