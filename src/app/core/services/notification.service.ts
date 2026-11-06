import { Injectable, computed, signal } from '@angular/core';

import { NOTIFICATIONS } from '../data/mock-data';
import { AppNotification } from '../models';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly items = signal<AppNotification[]>(NOTIFICATIONS);
  readonly unreadCount = computed(() => this.items().filter((n) => !n.read).length);

  markRead(id: number): void {
    this.items.update((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  markAllRead(): void {
    this.items.update((list) => list.map((n) => ({ ...n, read: true })));
  }

  remove(id: number): void {
    this.items.update((list) => list.filter((n) => n.id !== id));
  }
}
