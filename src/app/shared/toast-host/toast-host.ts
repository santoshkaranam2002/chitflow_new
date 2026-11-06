import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastService } from '../../core/services/toast.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-toast-host',
  imports: [Icon],
  templateUrl: './toast-host.html',
  styleUrl: './toast-host.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastHost {
  protected readonly toastService = inject(ToastService);
}
