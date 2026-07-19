import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeStore } from '../../core/theme/theme.store';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.html',
})
export class Skills {
  themeStore = inject(ThemeStore);
}
