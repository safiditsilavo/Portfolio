import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { ProjectCard } from './project-card/project-card';
import { PROJECTS } from './projects.data';

@Component({
  selector: 'app-projects',
  imports: [TranslocoPipe, ProjectCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly projects = PROJECTS;
}