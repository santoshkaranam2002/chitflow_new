import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { TabOption } from '../../core/models';
import { MemberService } from '../../core/services/member.service';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { Icon } from '../../shared/icon/icon';
import { MemberItem } from '../../shared/member-item/member-item';
import { PageHeader } from '../../shared/page-header/page-header';
import { Tabs } from '../../shared/tabs/tabs';

type StatusFilter = 'all' | 'Paid' | 'Pending';

@Component({
  selector: 'app-members',
  imports: [FormsModule, RouterLink, EmptyState, Icon, MemberItem, PageHeader, Tabs],
  templateUrl: './members.html',
  styleUrl: './members.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Members {
  private readonly service = inject(MemberService);

  protected readonly tab = signal('all');
  protected readonly query = signal('');
  protected readonly searching = signal(false);
  protected readonly filtering = signal(false);
  protected readonly status = signal<StatusFilter>('all');

  protected readonly tabs = computed<TabOption[]>(() => [
    { id: 'all', label: 'All Members', count: this.service.members().length },
    { id: 'mine', label: 'My Members', count: this.service.members().filter((m) => m.mine).length },
  ]);
  protected readonly filters: { id: StatusFilter; label: string }[] = [
    { id: 'all', label: 'Everyone' },
    { id: 'Paid', label: 'Paid' },
    { id: 'Pending', label: 'Pending' },
  ];

  protected readonly visible = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.service.members().filter(
      (m) =>
        (this.tab() === 'all' || m.mine) &&
        (this.status() === 'all' || m.status === this.status()) &&
        (!q || m.name.toLowerCase().includes(q) || m.no.toLowerCase().includes(q)),
    );
  });
  protected readonly paidCount = computed(() => this.visible().filter((m) => m.status === 'Paid').length);
  protected readonly pendingCount = computed(() => this.visible().length - this.paidCount());

  protected toggleSearch(): void {
    this.searching.update((v) => !v);
    if (!this.searching()) this.query.set('');
  }
}
