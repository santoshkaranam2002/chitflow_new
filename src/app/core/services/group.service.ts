import { Injectable, computed, signal } from '@angular/core';

import { GROUPS } from '../data/mock-data';
import { ChitGroup } from '../models';
import { inDays } from '../utils/date.util';

@Injectable({ providedIn: 'root' })
export class GroupService {
  readonly groups = signal<ChitGroup[]>(GROUPS);
  readonly mine = computed(() => this.groups().filter((g) => g.mine));
  readonly totalBalance = 154280;

  byId(id?: string | null): ChitGroup {
    return this.groups().find((g) => g.id === id) ?? this.groups()[0];
  }

  create(input: { name: string; value: number; members: number; duration: number; start: string }): ChitGroup {
    const group: ChitGroup = {
      id: `g${this.groups().length + 1}`,
      name: input.name.trim() || 'New Chit Group',
      value: input.value,
      members: input.members,
      duration: input.duration,
      monthly: Math.round(input.value / Math.max(input.duration, 1)),
      paid: 0,
      month: 1,
      nextAuction: input.start ? new Date(input.start).toISOString() : inDays(30),
      commission: 5,
      icon: 'users',
      bg: '#ffe6d8',
      color: '#f26a1b',
      mine: true,
    };
    this.groups.update((list) => [group, ...list]);
    return group;
  }
}
