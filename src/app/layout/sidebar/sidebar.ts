import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeStore } from '../../core/theme/theme.store';
import { NAV_ITEMS } from '../nav-items';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.html',
})
export class Sidebar {
  themeStore = inject(ThemeStore);
  protected readonly navItems = NAV_ITEMS;
}