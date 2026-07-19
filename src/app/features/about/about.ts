import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeStore } from '../../core/theme/theme.store';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
})
export class About {
  themeStore = inject(ThemeStore);
}
