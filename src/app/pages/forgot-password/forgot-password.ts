import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, inject, signal, viewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ToastService } from '../../core/services/toast.service';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';

type Step = 'mobile' | 'otp' | 'done';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink, Icon, PageHeader],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPassword {
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);
  private timer?: ReturnType<typeof setInterval>;

  protected readonly boxes = viewChildren<ElementRef<HTMLInputElement>>('box');
  protected readonly step = signal<Step>('mobile');
  protected readonly mobile = signal('9876543210');
  protected readonly digits = signal<string[]>(Array(6).fill(''));
  protected readonly seconds = signal(0);
  protected readonly masked = computed(() => this.mobile().replace(/^(\d{2})\d{5}(\d+)$/, '$1•••••$2'));
  protected readonly slots = [0, 1, 2, 3, 4, 5];

  constructor() {
    this.destroyRef.onDestroy(() => clearInterval(this.timer));
  }

  protected sendOtp(): void {
    this.step.set('otp');
    this.digits.set(Array(6).fill(''));
    this.startTimer();
    this.toast.show('OTP sent to your mobile', 'info', 'send');
    setTimeout(() => this.boxes()[0]?.nativeElement.focus(), 350);
  }

  protected type(i: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const digit = input.value.replace(/\D/g, '').slice(-1);
    input.value = digit;
    this.digits.update((d) => d.map((v, idx) => (idx === i ? digit : v)));
    if (digit && i < 5) this.boxes()[i + 1].nativeElement.focus();
  }

  protected back(i: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.digits()[i] && i > 0) this.boxes()[i - 1].nativeElement.focus();
  }

  protected paste(event: ClipboardEvent): void {
    const text = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 6);
    if (!text) return;
    event.preventDefault();
    this.digits.set(Array.from({ length: 6 }, (_, i) => text[i] ?? ''));
    this.boxes()[Math.min(text.length, 5)].nativeElement.focus();
  }

  protected resend(): void {
    this.startTimer();
    this.toast.show('New OTP sent', 'info', 'refresh');
  }

  protected verify(): void {
    this.step.set('done');
    clearInterval(this.timer);
  }

  protected toLogin(): void {
    this.router.navigateByUrl('/login');
  }

  private startTimer(): void {
    clearInterval(this.timer);
    this.seconds.set(30);
    this.timer = setInterval(() => {
      this.seconds.update((s) => Math.max(0, s - 1));
      if (this.seconds() === 0) clearInterval(this.timer);
    }, 1000);
  }
}
