import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ReportPeriod, TabOption } from '../../core/models';
import { ReportService } from '../../core/services/report.service';
import { ToastService } from '../../core/services/toast.service';
import { CountUp } from '../../shared/count-up/count-up';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';
import { InrPipe } from '../../shared/pipes/inr.pipe';
import { ProgressRing } from '../../shared/progress-ring/progress-ring';
import { Tabs } from '../../shared/tabs/tabs';

@Component({
  selector: 'app-reports',
  imports: [RouterLink, CountUp, Icon, PageHeader, InrPipe, ProgressRing, Tabs],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reports {
  private readonly service = inject(ReportService);
  private readonly toast = inject(ToastService);

  protected readonly links = this.service.links;
  protected readonly period = signal<string>('1Y');
  protected readonly selected = signal<number | null>(null);
  protected readonly tabs: TabOption[] = [
    { id: '3M', label: 'Last 3 Months' },
    { id: '6M', label: 'Last 6 Months' },
    { id: '1Y', label: '1 Year' },
  ];

  protected readonly data = computed(() => this.service.period(this.period() as ReportPeriod));
  protected readonly collected = computed(() => this.service.rows.reduce((s, r) => s + r.collected, 0));
  protected readonly pending = computed(() => this.service.rows.reduce((s, r) => s + r.pending, 0));
  protected readonly rate = computed(() => Math.round((this.collected() / (this.collected() + this.pending())) * 100));

  protected pick(i: number): void {
    this.selected.set(this.selected() === i ? null : i);
  }

  protected calendar(): void {
    this.toast.show('Choose a custom range soon', 'info', 'cal');
  }
}
