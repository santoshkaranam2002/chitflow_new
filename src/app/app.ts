import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeService } from './core/services/theme.service';
import { StatusBar } from './layout/status-bar/status-bar';
import { ToastHost } from './shared/toast-host/toast-host';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StatusBar, ToastHost],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  /** Injected once so the saved theme is applied on startup */
  protected readonly theme = inject(ThemeService);

  protected readonly highlights = [
    { icon: 'gavel', text: 'Live auctions with real-time bidding' },
    { icon: 'shield', text: 'Transparent chit groups & payments' },
    { icon: 'bar', text: 'Smart reports for every member' },
  ];
}
