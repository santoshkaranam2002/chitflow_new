import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeService } from './core/services/theme.service';
import { ToastHost } from './shared/toast-host/toast-host';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastHost],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  /** Injected once so the saved theme is applied on startup */
  protected readonly theme = inject(ThemeService);
}