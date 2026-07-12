import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeStore } from '../../core/theme/theme.store';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="max-w-3xl space-y-10 animate-fadeIn">
      <div class="border-l-4 pl-6" [class]="themeStore.themeColor().border">
        <h2 class="text-3xl font-extrabold text-white mb-4 tracking-tight">System Operator / Biography</h2>
        <p class="text-gray-400 text-lg leading-relaxed">
          I find calm within server consoles but visualize possibilities in design systems. 
          Having started by tracking complex distributed event transactions, I came to appreciate 
          how frontend architectures dictate the actual human value of any underlying API.
        </p>
      </div>

      <!-- Interactive Timeline -->
      <div class="space-y-6">
        <h3 class="text-xl font-mono flex items-center" [class]="themeStore.themeColor().text">
          <span class="mr-2">#</span> Career Lifecycle Logs
        </h3>
        
        <div class="relative border-l border-gray-900 ml-3 space-y-8 pl-8 pb-4">
          <!-- Timeline Node 1 -->
          <div class="relative">
            <span class="absolute -left-[41px] top-0 bg-[#050505] p-1.5 border rounded-full" [class]="themeStore.themeColor().border + ' ' + themeStore.themeColor().text">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </span>
            <h4 class="text-white font-bold text-lg font-mono">Frontend Systems Expansion</h4>
            <p class="text-sm font-mono mb-2" [class]="themeStore.themeColor().text">Current Directive</p>
            <p class="text-gray-400 text-sm leading-relaxed">
              Expanding architectural patterns into Angular Signals, component states, and reactivity paradigms. 
              Enabling microservices to communicate smoothly through optimized visual client engines.
            </p>
          </div>

          <!-- Timeline Node 2 -->
          <div class="relative">
            <span class="absolute -left-[41px] top-0 bg-[#050505] p-1.5 border rounded-full text-gray-500 border-gray-800">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
            <h4 class="text-white font-bold text-lg font-mono">Lead Backend Architect</h4>
            <p class="text-sm text-gray-500 font-mono mb-2">2021 - Present</p>
            <p class="text-gray-400 text-sm leading-relaxed">
              Leading system design over decoupled modern services. Overseeing CI/CD quality gates, deployment pipelines, 
              and clustering protocols inside dockerized ecosystems.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class About {
  themeStore = inject(ThemeStore);
}
