import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'info' | 'error';

export interface Toast {
  id: number;
  message: string;
  icon: string;
  kind: ToastKind;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 1;
  readonly toasts = signal<Toast[]>([]);

  show(message: string, kind: ToastKind = 'success', icon = kind === 'success' ? 'check' : 'bell'): void {
    const toast: Toast = { id: this.nextId++, message, icon, kind };
    this.toasts.update((list) => [...list.slice(-1), toast]);
    setTimeout(() => this.dismiss(toast.id), 2600);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
