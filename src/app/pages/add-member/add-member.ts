import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MemberStatus } from '../../core/models';
import { GroupService } from '../../core/services/group.service';
import { MemberService } from '../../core/services/member.service';
import { ToastService } from '../../core/services/toast.service';
import { initialsOf } from '../../core/utils/date.util';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-add-member',
  imports: [FormsModule, Icon, PageHeader],
  templateUrl: './add-member.html',
  styleUrl: './add-member.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMember {
  private readonly router = inject(Router);
  private readonly members = inject(MemberService);
  private readonly toast = inject(ToastService);

  protected readonly groups = inject(GroupService).mine;
  protected readonly name = signal('');
  protected readonly mobile = signal('');
  protected readonly groupId = signal(this.groups()[0]?.id ?? '');
  protected readonly status = signal<MemberStatus>('Pending');
  protected readonly statuses: MemberStatus[] = ['Paid', 'Pending'];

  protected readonly initials = computed(() => (this.name().trim() ? initialsOf(this.name()) : ''));

  protected add(): void {
    this.members.add({ name: this.name(), phone: this.mobile(), status: this.status() });
    this.toast.show(`${this.name().trim() || 'Member'} added`, 'success', 'user');
    this.router.navigateByUrl('/members');
  }
}
