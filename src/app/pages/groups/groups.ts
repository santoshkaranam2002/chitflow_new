import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { TabOption } from '../../core/models';
import { GroupService } from '../../core/services/group.service';
import { CountUp } from '../../shared/count-up/count-up';
import { EmptyState } from '../../shared/empty-state/empty-state';
import { GroupCard } from '../../shared/group-card/group-card';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';
import { Tabs } from '../../shared/tabs/tabs';

type Sort = 'recent' | 'value' | 'soon';

@Component({
  selector: 'app-groups',
  imports: [FormsModule, RouterLink, CountUp, EmptyState, GroupCard, Icon, PageHeader, Tabs],
  templateUrl: './groups.html',
  styleUrl: './groups.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Groups {
  private readonly service = inject(GroupService);

  protected readonly tab = signal('all');
  protected readonly query = signal('');
  protected readonly searching = signal(false);
  protected readonly sort = signal<Sort>('recent');

  protected readonly tabs = computed<TabOption[]>(() => [
    { id: 'all', label: 'All Groups', count: this.service.groups().length },
    { id: 'mine', label: 'My Groups', count: this.service.mine().length },
  ]);
  protected readonly sorts: { id: Sort; label: string }[] = [
    { id: 'recent', label: 'Recent' },
    { id: 'value', label: 'Highest value' },
    { id: 'soon', label: 'Auction soon' },
  ];

  protected readonly visible = computed(() => {
    const q = this.query().trim().toLowerCase();
    const base = this.tab() === 'mine' ? this.service.mine() : this.service.groups();
    const list = base.filter((g) => !q || g.name.toLowerCase().includes(q));
    switch (this.sort()) {
      case 'value': return [...list].sort((a, b) => b.value - a.value);
      case 'soon': return [...list].sort((a, b) => +new Date(a.nextAuction) - +new Date(b.nextAuction));
      default: return list;
    }
  });

  protected readonly totalValue = computed(() => this.visible().reduce((s, g) => s + g.value, 0));
  protected readonly totalMembers = computed(() => this.visible().reduce((s, g) => s + g.members, 0));
  protected readonly avgProgress = computed(() => {
    const list = this.visible();
    return list.length ? Math.round(list.reduce((s, g) => s + (g.paid / g.members) * 100, 0) / list.length) : 0;
  });

  protected toggleSearch(): void {
    this.searching.update((v) => !v);
    if (!this.searching()) this.query.set('');
  }
}