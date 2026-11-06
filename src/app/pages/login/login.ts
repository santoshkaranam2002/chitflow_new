import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ToastService } from '../../core/services/toast.service';
import { Icon } from '../../shared/icon/icon';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, Icon, Logo],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  protected readonly mobile = signal('9876543210');
  protected readonly password = signal('123456');
  protected readonly showPassword = signal(false);
  protected readonly remember = signal(true);
  protected readonly loading = signal(false);

  protected readonly trust = [
    { icon: 'shield', label: 'Secure' },
    { icon: 'eye', label: 'Transparent' },
    { icon: 'bolt', label: 'Instant' },
  ];

  protected login(): void {
    this.loading.set(true);
    setTimeout(() => this.router.navigateByUrl('/home'), 900);
  }

  protected biometric(): void {
    this.toast.show('Fingerprint verified', 'success', 'fingerprint');
    setTimeout(() => this.router.navigateByUrl('/home'), 700);
  }
}
