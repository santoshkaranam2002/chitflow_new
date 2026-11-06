import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { LabelValue } from '../../core/models';
import { GroupService } from '../../core/services/group.service';
import { MemberService } from '../../core/services/member.service';
import { ToastService } from '../../core/services/toast.service';
import { CountUp } from '../../shared/count-up/count-up';
import { GroupCard } from '../../shared/group-card/group-card';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';
import { InrPipe } from '../../shared/pipes/inr.pipe';
import { ProgressRing } from '../../shared/progress-ring/progress-ring';

@Component({
  selector: 'app-member-details',
  imports: [NgClass, CountUp, GroupCard, Icon, PageHeader, InrPipe, ProgressRing],
  templateUrl: './member-details.html',
  styleUrl: './member-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberDetails {
  private readonly members = inject(MemberService);
  private readonly toast = inject(ToastService);

  readonly id = input<string>();

  protected readonly member = computed(() => this.members.byId(this.id()));
  protected readonly groups = inject(GroupService).mine;
  protected readonly memberGroups = computed(() => this.groups().slice(0, this.member().groups));
  protected readonly dueTotal = computed(() => this.member().totalPaid + this.member().pending);
  protected readonly paidPercent = computed(() => Math.round((this.member().totalPaid / Math.max(this.dueTotal(), 1)) * 100));
  protected readonly info = computed<LabelValue[]>(() => {
    const m = this.member();
    return [
      { label: 'Mobile', value: m.phone },
      { label: 'Joined', value: new Date(m.joined).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) },
      { label: 'Groups', value: String(m.groups) },
      { label: 'Total paid', value: `₹${m.totalPaid.toLocaleString('en-IN')}` },
      { label: 'Pending', value: `₹${m.pending.toLocaleString('en-IN')}` },
    ];
  });

  protected message(): void {
    this.toast.show(`Reminder sent to ${this.member().name}`, 'success', 'send');
  }
}
