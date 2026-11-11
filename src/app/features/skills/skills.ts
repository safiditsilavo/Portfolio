import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// import { ThemeStore } from '../../core/theme/theme.store';
import { TranslocoPipe } from '@jsverse/transloco';
import { SKILL_GROUPS, SkillAccent } from './skills.data';

const CHIP_CLASSES: Record<SkillAccent, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
};

@Component({
  selector: 'app-skills',
  imports: [TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.html',
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
  protected readonly chipClasses = CHIP_CLASSES;
  // themeStore = inject(ThemeStore);
}
