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
  template: `
    <footer class="absolute bottom-0 left-0 right-0 bg-[#080808] border-t border-gray-900 transition-all duration-300 flex flex-col z-40"
         [class]="isOpen() ? 'h-56' : 'h-11'">

      <div class="flex items-center justify-between px-5 py-2.5 bg-[#0e0e0e] cursor-pointer hover:bg-[#121212] select-none"
           (click)="toggle()">
        <div class="flex items-center space-x-2 text-xs font-mono text-gray-400">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" [class]="themeStore.themeColor().text">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>BUILT-IN TERMINAL CONSOLE</span>
        </div>
        <div class="flex items-center space-x-2 text-xs text-gray-600">
          <span class="hidden sm:inline font-mono">Type 'help' to begin</span>
          <svg class="w-4 h-4 transition-transform duration-200" [class.rotate-180]="isOpen()"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </div>

      @if (isOpen()) {
        <div class="flex-1 p-5 font-mono text-xs overflow-y-auto terminal-scroll space-y-2 bg-[#060606] text-gray-300">
          @for (line of output(); track $index) {
            <div class="leading-relaxed">
              @if (line.type === 'command') { <span class="text-gray-500 mr-2">$</span> }
              @if (line.type === 'system') { <span class="text-sky-400 mr-2">[SYSTEM]</span> }
              <span class="whitespace-pre-wrap"
                    [class]="line.type === 'response' ? themeStore.themeColor().text : (line.type === 'error' ? 'text-red-400' : 'text-gray-300')">
                {{ line.content }}
              </span>
            </div>
          }
          <div class="flex items-center pt-1">
            <span class="mr-2" [class]="themeStore.themeColor().text">➜</span>
            <span class="text-cyan-400 mr-2">~</span>
            <input #inputRef
                   type="text"
                   [value]="input()"
                   (input)="input.set($any($event.target).value)"
                   (keydown.enter)="handleCommand()"
                   class="flex-1 bg-transparent border-none outline-none text-gray-100 focus:ring-0 p-0 font-mono text-xs"
                   placeholder="Enter console command..."
                   autofocus />
          </div>
          <div #bottomRef></div>
        </div>
      }
    </footer>
  `,
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