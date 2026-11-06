import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { GroupService } from '../../core/services/group.service';
import { ToastService } from '../../core/services/toast.service';
import { Icon } from '../../shared/icon/icon';
import { PageHeader } from '../../shared/page-header/page-header';
import { InrPipe } from '../../shared/pipes/inr.pipe';

@Component({
  selector: 'app-create-group',
  imports: [FormsModule, Icon, PageHeader, InrPipe],
  templateUrl: './create-group.html',
  styleUrl: './create-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGroup {
  private readonly router = inject(Router);
  private readonly groups = inject(GroupService);
  private readonly toast = inject(ToastService);

  protected readonly name = signal('');
  protected readonly value = signal(100000);
  protected readonly members = signal(20);
  protected readonly duration = signal(20);
  protected readonly start = signal('2026-12-01');
  protected readonly type = signal('Open bid');
  protected readonly types = ['Open bid', 'Lucky draw', 'Fixed'];

  protected readonly monthly = computed(() => Math.round(this.value() / Math.max(this.duration(), 1)));
  protected readonly pool = computed(() => this.monthly() * this.members());

  protected step(target: 'members' | 'duration', by: number): void {
    const sig = target === 'members' ? this.members : this.duration;
    sig.update((v) => Math.max(1, v + by));
  }

  protected create(): void {
    this.groups.create({ name: this.name(), value: this.value(), members: this.members(), duration: this.duration(), start: this.start() });
    this.toast.show('Chit group created', 'success', 'users');
    this.router.navigateByUrl('/groups');
  }
}
