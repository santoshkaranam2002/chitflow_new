import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { GroupService } from '../../core/services/group.service';
import { ToastService } from '../../core/services/toast.service';
import { UserService } from '../../core/services/user.service';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, FormsModule, RouterLink, Icon, PageHeader],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  private readonly user = inject(UserService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly profile = this.user.profile;
  protected readonly groupCount = inject(GroupService).mine().length;

  protected readonly name = signal(this.profile().name);
  protected readonly mobile = signal(this.profile().mobile);
  protected readonly email = signal(this.profile().email);
  protected readonly city = signal(this.profile().city);
  protected readonly dirty = computed(
    () => this.name() !== this.profile().name || this.mobile() !== this.profile().mobile || this.email() !== this.profile().email || this.city() !== this.profile().city,
  );

  protected save(): void {
    this.user.updateProfile({ name: this.name(), mobile: this.mobile(), email: this.email(), city: this.city() });
    this.toast.show('Profile updated');
  }

  protected photo(): void {
    this.toast.show('Photo upload is coming soon', 'info', 'camera');
  }

  protected logout(): void {
    this.router.navigateByUrl('/login');
  }
}
