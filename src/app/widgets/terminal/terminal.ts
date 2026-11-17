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
import { TranslocoPipe } from '@jsverse/transloco';

type LineType = 'command' | 'response' | 'system' | 'error' | 'info';

interface TerminalLine {
  type: LineType;
  key?: string;
  params?: Record<string, string>;
  raw?: string;
}

@Component({
  selector: 'app-terminal',
  imports: [TranslocoPipe],
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
  output = signal<TerminalLine[]>([
    { type: 'system', key: 'terminal.boot.init' },
    { type: 'info', key: 'terminal.boot.hint' },
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
    let key = '';
    let params: Record<string, string> = {};
    let isError = false;

    switch (cmd) {
      case 'help':
        key = 'terminal.responses.help';
        break;

      case 'neofetch':
        key = 'terminal.responses.neofetch';
        params = { theme: this.themeStore.theme().toUpperCase() };
        break;

      case 'theme':
        if (this.themeStore.isValidTheme(arg)) {
          this.themeStore.setTheme(arg);
          key = 'terminal.responses.themeChanged';
          params = { theme: arg.toUpperCase() };
        } else {
          isError = true;
          key = 'terminal.responses.themeInvalid';
          params = { arg };
        }
        break;

      case 'cat':
        if (arg === 'bio' || arg === 'biography') {
          key = 'terminal.responses.bio';
        } else {
          isError = true;
          key = 'terminal.responses.fileNotFound';
          params = { arg };
        }
        break;

      case 'home':
      case 'about':
      case 'skills':
      case 'projects':
      case 'contact':
        this.router.navigate([cmd === 'home' ? '/' : `/${cmd}`]);
        key = 'terminal.responses.routed';
        params = { page: cmd.toUpperCase() };
        break;

      case 'date':
        key = 'terminal.responses.date';
        params = { date: new Date().toUTCString() };
        break;

      case 'clear':
        this.output.set([]);
        this.input.set('');
        return;

      default:
        isError = true;
        key = 'terminal.responses.unknown';
        params = { cmd };
    }

    this.output.update(o => [
      ...o,
      { type: 'command', raw: rawInput },
      { type: isError ? 'error' : 'response', key, params },
    ]);
    this.input.set('');
  }
}