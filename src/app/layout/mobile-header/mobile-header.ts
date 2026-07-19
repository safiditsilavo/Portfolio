import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeStore } from '../../core/theme/theme.store';
import { NAV_ITEMS } from '../nav-items';

@Component({
  selector: 'app-mobile-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mobile-header.html',
})
export class MobileHeader {
  themeStore = inject(ThemeStore);
  protected readonly navItems = NAV_ITEMS;
}