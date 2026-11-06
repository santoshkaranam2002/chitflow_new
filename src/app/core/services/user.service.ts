import { Injectable, signal } from '@angular/core';

import { FAQS, SETTING_TOGGLES, USER } from '../data/mock-data';
import { FaqItem, Language, SettingToggle, UserProfile } from '../models';
import { initialsOf } from '../utils/date.util';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly profile = signal<UserProfile>(USER);
  readonly toggles = signal<SettingToggle[]>(SETTING_TOGGLES);
  readonly language = signal<Language>('English');
  readonly faqs: FaqItem[] = FAQS;
  /** Hide / show money on the dashboard */
  readonly balanceHidden = signal(false);

  updateProfile(changes: Partial<UserProfile>): void {
    this.profile.update((p) => {
      const next = { ...p, ...changes };
      return { ...next, initials: initialsOf(next.name) };
    });
  }

  flip(id: string): void {
    this.toggles.update((list) => list.map((t) => (t.id === id ? { ...t, on: !t.on } : t)));
  }
}
