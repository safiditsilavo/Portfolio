import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeStore } from '../../core/theme/theme.store';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="max-w-4xl space-y-10 animate-fadeIn">
      <div class="space-y-6">
        <div class="inline-flex items-center px-3 py-1.5 rounded-full border bg-opacity-10 text-xs font-mono"
             [class]="themeStore.themeColor().border + ' ' + themeStore.themeColor().bg + ' ' + themeStore.themeColor().text">
          <span class="w-2.5 h-2.5 rounded-full mr-2.5 animate-pulse" [class]="themeStore.themeColor().accent"></span>
          OPEN TO OPPORTUNITIES & COLLABORATIONS
        </div>

        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Backend Architect <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r" [class]="themeStore.gradientScheme()">
            Frontend Explorer
          </span>
        </h1>

        <p class="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
          Building highly resilient server-side architectures while pursuing design craft on the modern frontend.
          Bridging pure functional robustness with expressive, intuitive user interfaces.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6 pt-6">
        <div class="p-6 bg-[#0c0c0c] border border-gray-900 rounded-xl transition-all hover:border-gray-800">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-emerald-500/10 text-emerald-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 012-2h2a2 2 0 012 2m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white mb-2 font-mono">Backend Engines</h3>
          <p class="text-sm text-gray-400 leading-relaxed">Expert design in NestJS, high performance Python endpoints, and classic resilient PHP pipelines.</p>
        </div>

        <div class="p-6 bg-[#0c0c0c] border border-gray-900 rounded-xl transition-all hover:border-gray-800">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-cyan-500/10 text-cyan-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white mb-2 font-mono">Modern UIs</h3>
          <p class="text-sm text-gray-400 leading-relaxed">Iteratively shaping pixel-perfect applications leveraging Angular Signals and the React hooks ecosystem.</p>
        </div>

        <div class="p-6 bg-[#0c0c0c] border border-gray-900 rounded-xl transition-all hover:border-gray-800">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-purple-500/10 text-purple-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-white mb-2 font-mono">Data Infrastructure</h3>
          <p class="text-sm text-gray-400 leading-relaxed">Search tuning via Elasticsearch, schema orchestration in PostgreSQL, and real-time caching via Redis.</p>
        </div>
      </div>
    </section>
  `,
})
export class Home {
  themeStore = inject(ThemeStore);
}