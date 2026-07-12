import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeStore } from '../../core/theme/theme.store';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="max-w-4xl space-y-10 animate-fadeIn">
      <div>
        <h2 class="text-3xl font-extrabold text-white mb-2">Technical Arsenal</h2>
        <p class="text-gray-400 text-sm font-mono">Classified technologies currently deployed in production pipelines.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Group 1 -->
        <div class="space-y-6">
          <div>
            <h3 class="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Core Backend Systems</h3>
            <div class="flex flex-wrap gap-2.5">
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">Python (FastAPI)</span>
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">NestJS (TypeScript)</span>
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">PHP (Laravel)</span>
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">GraphQL / REST APIs</span>
            </div>
          </div>

          <div>
            <h3 class="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Data Infrastructure</h3>
            <div class="flex flex-wrap gap-2.5">
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-purple-500/10 text-purple-400 border-purple-500/30">PostgreSQL</span>
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-purple-500/10 text-purple-400 border-purple-500/30">Elasticsearch Stack</span>
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-purple-500/10 text-purple-400 border-purple-500/30">Redis Cache</span>
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-purple-500/10 text-purple-400 border-purple-500/30">MongoDB</span>
            </div>
          </div>
        </div>

        <!-- Group 2 -->
        <div class="space-y-6">
          <div>
            <h3 class="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Frontend Engines</h3>
            <div class="flex flex-wrap gap-2.5">
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-cyan-500/10 text-cyan-400 border-cyan-500/30">Angular (Signals)</span>
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-cyan-500/10 text-cyan-400 border-cyan-500/30">React (Context / Hooks)</span>
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-cyan-500/10 text-cyan-400 border-cyan-500/30">Tailwind CSS Utility</span>
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-cyan-500/10 text-cyan-400 border-cyan-500/30">Modern TypeScript</span>
            </div>
          </div>

          <div>
            <h3 class="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Operations & Delivery</h3>
            <div class="flex flex-wrap gap-2.5">
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-amber-500/10 text-amber-400 border-amber-500/30">Docker Containers</span>
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-amber-500/10 text-amber-400 border-amber-500/30">Git / GitHub Actions</span>
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-amber-500/10 text-amber-400 border-amber-500/30">CI/CD Jenkins System</span>
              <span class="px-3 py-1.5 rounded-lg text-xs font-mono border bg-amber-500/10 text-amber-400 border-amber-500/30">Linux (Debian / RHEL)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Skills {
  themeStore = inject(ThemeStore);
}
