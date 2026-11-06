import { Injectable, signal } from '@angular/core';

import { MEMBERS } from '../data/mock-data';
import { Member, MemberStatus } from '../models';
import { initialsOf } from '../utils/date.util';

const COLORS = ['#ffd8c8', '#d9e4fb', '#ffd3d3', '#cdeedd', '#e0dcfb', '#fde2ee'];

@Injectable({ providedIn: 'root' })
export class MemberService {
  readonly members = signal<Member[]>(MEMBERS);

  byId(id?: string | null): Member {
    return this.members().find((m) => m.id === id) ?? this.members()[0];
  }

  add(input: { name: string; phone: string; status: MemberStatus }): Member {
    const n = this.members().length + 1;
    const member: Member = {
      id: `m${n}`,
      initials: initialsOf(input.name),
      name: input.name.trim() || 'New Member',
      no: `M${String(n).padStart(3, '0')}`,
      status: input.status,
      color: COLORS[n % COLORS.length],
      phone: input.phone || '—',
      joined: new Date().toISOString(),
      groups: 1,
      totalPaid: 0,
      pending: 0,
      mine: true,
    };
    this.members.update((list) => [member, ...list]);
    return member;
  }
}
