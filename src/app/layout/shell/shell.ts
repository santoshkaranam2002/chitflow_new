import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BottomNav } from '../bottom-nav/bottom-nav';
import { Drawer } from '../drawer/drawer';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

/**
 * Layout for every signed-in screen.
 *  - Web (≥ 900px): dark sidebar + top bar + content
 *  - Mobile: content + bottom navigation + slide-in drawer
 */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, BottomNav, Drawer, Sidebar, Topbar],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {
  protected readonly drawerOpen = signal(false);
}
