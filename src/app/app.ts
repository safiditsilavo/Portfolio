import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { MobileHeader } from './layout/mobile-header/mobile-header';
import { Terminal } from './widgets/terminal/terminal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, MobileHeader, Terminal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `],
  template: `
    <div class="flex h-screen bg-[#050505] text-gray-300 font-sans overflow-hidden selection:bg-emerald-500/20">
      <app-sidebar />
      <div class="flex-1 flex flex-col relative">
        <app-mobile-header />
        <main class="flex-1 overflow-y-auto p-6 md:p-12 pb-56 scrollbar-hide">
          <router-outlet />
        </main>
        <app-terminal />
      </div>
    </div>
  `,
})
export class App {}