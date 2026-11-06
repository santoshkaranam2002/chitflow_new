import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService } from '../../core/services/toast.service';
import { checkPassword } from '../../core/utils/password.util';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule, Icon, PageHeader],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePassword {
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  protected readonly current = signal('');
  protected readonly next = signal('');
  protected readonly confirm = signal('');
  protected readonly visible = signal(false);

  protected readonly strength = computed(() => checkPassword(this.next()));
  protected readonly matches = computed(() => !!this.confirm() && this.confirm() === this.next());
  protected readonly segments = [1, 2, 3, 4];

  protected update(): void {
    this.toast.show('Password updated successfully', 'success', 'lock');
    this.router.navigateByUrl('/settings');
  }
}
