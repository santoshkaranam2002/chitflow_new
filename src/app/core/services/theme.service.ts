import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';
const KEY = 'chitflow-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly mode = signal<ThemeMode>(this.read());
  private readonly query = this.doc.defaultView?.matchMedia?.('(prefers-color-scheme: dark)');
  private readonly systemDark = signal(this.query?.matches ?? false);
  readonly isDark = computed(() => (this.mode() === 'system' ? this.systemDark() : this.mode() === 'dark'));

  constructor() {
    this.query?.addEventListener('change', (e) => this.systemDark.set(e.matches));

    effect(() => {
      this.doc.documentElement.dataset['theme'] = this.isDark() ? 'dark' : 'light';
      try { localStorage.setItem(KEY, this.mode()); } catch { /* storage unavailable */ }
    });
  }

  set(mode: ThemeMode): void { this.mode.set(mode); }
  toggle(): void { this.mode.set(this.isDark() ? 'light' : 'dark'); }

  private read(): ThemeMode {
    try {
      const v = localStorage.getItem(KEY);
      if (v === 'light' || v === 'dark' || v === 'system') return v;
    } catch { /* storage unavailable */ }
    return 'light';
  }
}
