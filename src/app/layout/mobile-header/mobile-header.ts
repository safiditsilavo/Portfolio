import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeStore } from '../../core/theme/theme.store';
import { NAV_ITEMS } from '../nav-items';

@Component({
  selector: 'app-mobile-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="md:hidden p-4 border-b border-gray-900 flex justify-between items-center bg-[#0a0a0a]">
      <span class="font-bold font-mono text-lg" [class]="themeStore.themeColor().text">DEV_PORTAL</span>
      <div class="flex space-x-3">
        @for (item of navItems; track item.path) {
          <a [routerLink]="item.path"
             routerLinkActive="active"
             [routerLinkActiveOptions]="{ exact: item.path === '/' }"
             #rla="routerLinkActive"
             class="p-2 rounded hover:bg-white/5 cursor-pointer"
             [class]="rla.isActive ? themeStore.themeColor().text : 'text-gray-400'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="item.icon" />
            </svg>
          </a>
        }
      </div>
    </header>
  `,
})
export class MobileHeader {
  themeStore = inject(ThemeStore);
  protected readonly navItems = NAV_ITEMS;
}