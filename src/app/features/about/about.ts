import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeStore } from '../../core/theme/theme.store';
import { EDUCATION, EXPERIENCES } from './about.data';
import { TimelineItem } from './timeline-item/timeline-item';

@Component({
  selector: 'app-about',
  imports: [TranslocoPipe, TimelineItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
})
export class About {
  themeStore = inject(ThemeStore);
  protected readonly experiences = EXPERIENCES;
  protected readonly education = EDUCATION;
}