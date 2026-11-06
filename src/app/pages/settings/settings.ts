import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Language } from '../../core/models';
import { ThemeMode, ThemeService } from '../../core/services/theme.service';
import { ToastService } from '../../core/services/toast.service';
import { UserService } from '../../core/services/user.service';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-settings',
  imports: [RouterLink, Icon, PageHeader],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  private readonly toast = inject(ToastService);
  protected readonly theme = inject(ThemeService);
  protected readonly user = inject(UserService);

  protected readonly themes: { id: ThemeMode; label: string; icon: string }[] = [
    { id: 'light', label: 'Light', icon: 'sun' },
    { id: 'dark', label: 'Dark', icon: 'moon' },
    { id: 'system', label: 'Auto', icon: 'settings' },
  ];
  protected readonly languages: Language[] = ['English', 'తెలుగు', 'हिन्दी'];
  protected readonly links = [
    { icon: 'lock', label: 'Change Password', path: '/settings/change-password' },
    { icon: 'shield', label: 'Privacy Policy', path: '/settings' },
    { icon: 'help', label: 'About ChitFlow v1.0', path: '/settings' },
  ];

  protected toggle(id: string, label: string): void {
    this.user.flip(id);
    const on = this.user.toggles().find((t) => t.id === id)?.on;
    this.toast.show(`${label} ${on ? 'enabled' : 'disabled'}`, on ? 'success' : 'info');
  }
}
