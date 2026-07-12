import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectCard } from './project-card/project-card';
import { PROJECTS } from './projects.data';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="max-w-5xl space-y-8 animate-fadeIn">
      <div>
        <h2 class="text-3xl font-extrabold text-white mb-2">Key Contributions</h2>
        <p class="text-gray-400 text-sm font-mono">Direct system architecture impacts and project snapshots.</p>
      </div>

      <div class="bg-amber-500/5 border border-amber-500/20 p-5 rounded-xl flex items-start space-x-4">
        <div class="p-2 bg-amber-500/10 rounded-lg text-amber-400 mt-0.5">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <h4 class="text-amber-400 font-bold text-sm font-mono uppercase tracking-wider">Proprietary Notice</h4>
          <p class="text-gray-400 text-xs mt-1 leading-relaxed font-sans">
            Most developments are enterprise class systems protected under closed-source licenses.
            Below are abstract technical breakdown reports outlining the respective architectural strategies.
          </p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        @for (project of projects; track project.title) {
          <app-project-card [project]="project" />
        }
      </div>
    </section>
  `,
})
export class Projects {
  protected readonly projects = PROJECTS;
}