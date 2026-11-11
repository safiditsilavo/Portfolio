import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ThemeStore } from '../../../core/theme/theme.store';
import { TimelineEntry } from '../about.data';

@Component({
  selector: 'app-timeline-item',
  imports: [TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timeline-item.html',
})
export class TimelineItem {
  entry = input.required<TimelineEntry>();

  private themeStore = inject(ThemeStore);

  protected iconClasses = computed(() =>
    this.entry().current
      ? this.themeStore.themeColor().border + ' ' + this.themeStore.themeColor().text
      : 'text-gray-500 border-gray-800',
  );

  protected periodClass = computed(() =>
    this.entry().current ? this.themeStore.themeColor().text : 'text-gray-500',
  );
}