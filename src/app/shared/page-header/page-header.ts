import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { Icon } from '../icon/icon';

@Component({
  selector: 'app-page-header',
  imports: [Icon],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  private readonly location = inject(Location);

  readonly title = input.required<string>();
  readonly subtitle = input('');

  protected back(): void {
    this.location.back();
  }
}
