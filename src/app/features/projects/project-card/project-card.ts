import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Project, ProjectAccent } from '../projects.data';

const ACCENT_CLASSES: Record<ProjectAccent, { iconBg: string; iconText: string; hoverBorder: string; shadow: string }> = {
  emerald: {
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/50',
    shadow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]',
  },
  cyan: {
    iconBg: 'bg-cyan-500/10',
    iconText: 'text-cyan-400',
    hoverBorder: 'hover:border-cyan-500/50',
    shadow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.05)]',
  },
  amber: {
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-400',
    hoverBorder: 'hover:border-amber-500/50',
    shadow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.05)]',
  },
  purple: {
    iconBg: 'bg-purple-500/10',
    iconText: 'text-purple-400',
    hoverBorder: 'hover:border-purple-500/50',
    shadow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.05)]',
  },
};

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="group relative bg-[#0c0c0c] border border-gray-900 rounded-xl p-6 transition-all duration-300"
         [class]="classes().hoverBorder + ' ' + classes().shadow">
      <div class="absolute top-5 right-5 text-gray-600 hover:text-white cursor-help"
           [title]="project().isPrivate ? 'Private Repository' : 'Playground'">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <div class="flex items-center space-x-3 mb-4">
        <div class="p-2.5 rounded-lg" [class]="classes().iconBg + ' ' + classes().iconText">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="project().icon" />
          </svg>
        </div>
        <h3 class="font-bold text-gray-200 font-mono text-base">{{ project().title }}</h3>
      </div>
      <p class="text-gray-400 text-xs mb-6 leading-relaxed">{{ project().description }}</p>
      <div class="flex flex-wrap gap-2 text-[10px] font-mono text-gray-500">
        @for (tag of project().tags; track tag) {
          <span>{{ tag }}</span>
        }
      </div>
    </div>
  `,
})
export class ProjectCard {
  project = input.required<Project>();

  protected classes = computed(() => ACCENT_CLASSES[this.project().accent]);
}
