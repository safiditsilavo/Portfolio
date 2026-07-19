import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectCard } from './project-card/project-card';
import { PROJECTS } from './projects.data';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly projects = PROJECTS;
}