import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { GroupService } from '../../core/services/group.service';
import { MemberService } from '../../core/services/member.service';
import { ReportService } from '../../core/services/report.service';
import { ToastService } from '../../core/services/toast.service';
import { CountUp } from '../../shared/count-up/count-up';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';
import { InrPipe } from '../../shared/pipes/inr.pipe';

@Component({
  selector: 'app-report-detail',
  imports: [CountUp, Icon, PageHeader, InrPipe],
  templateUrl: './report-detail.html',
  styleUrl: './report-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetail {
  private readonly reports = inject(ReportService);
  private readonly toast = inject(ToastService);

  /** ?type= one of group | member | payment | auction */
  readonly type = input<string>('group');

  protected readonly title = computed(() => this.reports.links.find((l) => l.id === this.type())?.title ?? 'Group Wise Summary');
  protected readonly rows = this.reports.rows;
  protected readonly groupsCount = inject(GroupService).mine().length;
  protected readonly membersCount = inject(MemberService).members().length;
  protected readonly totalCollected = this.rows.reduce((s, r) => s + r.collected, 0);
  protected readonly totalPending = this.rows.reduce((s, r) => s + r.pending, 0);

  protected percent(collected: number, pending: number): number {
    return Math.round((collected / (collected + pending)) * 100);
  }

  protected download(): void {
    this.toast.show(`${this.title()} (PDF) downloaded`, 'success', 'download');
  }
}
