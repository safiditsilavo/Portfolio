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
    templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();

  protected classes = computed(() => ACCENT_CLASSES[this.project().accent]);
}
