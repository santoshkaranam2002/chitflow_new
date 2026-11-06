import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BottomNav } from '../bottom-nav/bottom-nav';
import { Drawer } from '../drawer/drawer';

/** Layout for every signed-in screen: scrollable content + bottom navigation + side drawer. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, BottomNav, Drawer],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {
  protected readonly drawerOpen = signal(false);
}
