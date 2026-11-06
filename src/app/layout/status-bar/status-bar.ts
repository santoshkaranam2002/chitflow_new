import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { injectNow } from '../../core/utils/time.util';

@Component({
  selector: 'app-status-bar',
  imports: [DatePipe],
  templateUrl: './status-bar.html',
  styleUrl: './status-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBar {
  protected readonly now = injectNow(15_000);
}
