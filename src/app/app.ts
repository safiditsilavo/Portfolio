import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { MobileHeader } from './layout/mobile-header/mobile-header';
import { Terminal } from './widgets/terminal/terminal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, MobileHeader, Terminal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `],
  templateUrl: './app.html',
})
export class App {}