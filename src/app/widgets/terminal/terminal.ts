import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ThemeStore } from '../../core/theme/theme.store';

type LineType = 'command' | 'response' | 'system' | 'error' | 'info';

@Component({
  selector: 'app-terminal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .terminal-scroll::-webkit-scrollbar { width: 4px; }
    .terminal-scroll::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
    .terminal-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 2px; }
  `],
  templateUrl: './terminal.html',
})
export class Terminal {
  themeStore = inject(ThemeStore);
  private router = inject(Router);

  isOpen = signal(true);
  input = signal('');
  output = signal<Array<{ type: LineType; content: string }>>([
    { type: 'system', content: 'SYSTEM INITIALIZED. Welcome to Dev_OS v3.1.0' },
    { type: 'info', content: 'Try typing commands like "neofetch", "theme amber", "cat bio", or "clear".' },
  ]);

  @ViewChild('bottomRef') private bottom!: ElementRef;
  @ViewChild('inputRef') private inputEl!: ElementRef;

  constructor() {
    effect(() => {
      this.output();
      this.scrollToBottom();
    });
  }

  toggle() {
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      setTimeout(() => this.inputEl?.nativeElement.focus(), 100);
    }
  }

  private scrollToBottom() {
    setTimeout(() => this.bottom?.nativeElement.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  handleCommand() {
    const rawInput = this.input().trim();
    if (!rawInput) return;

    const [cmd, arg = ''] = rawInput.split(' ').map(t => t.toLowerCase());
    let response = '';
    let isError = false;

    switch (cmd) {
      case 'help':
        response = `AVAILABLE SYSTEM DIRECTIVES:
  neofetch             Show retro platform specs
  theme <color>        Change terminal theme color (green, amber, blue, purple)
  cat bio              Read my professional developer profile
  home, about,         Navigate directly to matching pages
  skills, projects,
  contact
  clear                Purge the console memory screen
  date                 Display standard host server current time`;
        break;

      case 'neofetch':
        response = `KERNEL: Angular 22.x Architecture Virtual Node
ACCENT COLOR: ${this.themeStore.theme().toUpperCase()} Accent Core`;
        break;

      case 'theme':
        if (this.themeStore.isValidTheme(arg)) {
          this.themeStore.setTheme(arg);
          response = `SUCCESS: Mainframe accent swapped successfully to [${arg.toUpperCase()}]`;
        } else {
          isError = true;
          response = `ERROR: Invalid theme color "${arg}". Try "theme green", "theme amber", "theme blue", or "theme purple".`;
        }
        break;

      case 'home':
      case 'about':
      case 'skills':
      case 'projects':
      case 'contact':
        this.router.navigate([cmd === 'home' ? '/' : `/${cmd}`]);
        response = `SUCCESS: Routed to "${cmd.toUpperCase()}"`;
        break;

      case 'date':
        response = `UTC CURRENT TIMESTAMP: ${new Date().toUTCString()}`;
        break;

      case 'clear':
        this.output.set([]);
        this.input.set('');
        return;

      default:
        isError = true;
        response = `UNRECOGNIZED TERMINAL DIRECTIVE: "${cmd}". Type "help" to list valid instructions.`;
    }

    this.output.update(o => [
      ...o,
      { type: 'command', content: rawInput },
      { type: isError ? 'error' : 'response', content: response },
    ]);
    this.input.set('');
  }
}