import { DestroyRef, Signal, inject, signal } from '@angular/core';

/** Signal that ticks with the current timestamp. Call inside an injection context. */
export function injectNow(intervalMs = 1000): Signal<number> {
  const now = signal(Date.now());
  const id = setInterval(() => now.set(Date.now()), intervalMs);
  inject(DestroyRef).onDestroy(() => clearInterval(id));
  return now.asReadonly();
}

export interface Duration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

export function splitDuration(ms: number): Duration {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: total === 0,
  };
}

export const pad = (n: number): string => String(n).padStart(2, '0');
