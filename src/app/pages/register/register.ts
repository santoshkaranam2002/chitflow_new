import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ToastService } from '../../core/services/toast.service';
import { checkPassword } from '../../core/utils/password.util';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, Icon, PageHeader],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  protected readonly name = signal('');
  protected readonly mobile = signal('');
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly showPassword = signal(false);
  protected readonly agree = signal(true);
  protected readonly loading = signal(false);

  protected readonly strength = computed(() => checkPassword(this.password()));
  protected readonly segments = [1, 2, 3, 4];

  protected register(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.toast.show('Account created – welcome to ChitFlow!');
      this.router.navigateByUrl('/home');
    }, 900);
  }
}
