import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeStore } from './core/theme/theme.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .terminal-scroll::-webkit-scrollbar { width: 4px; }
    .terminal-scroll::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
    .terminal-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 2px; }
  `],
  template: `
    <div class="flex h-screen bg-[#050505] text-gray-300 font-sans overflow-hidden selection:bg-emerald-500/20">

      <!-- Sidebar Navigation (Desktop) -->
      <aside class="w-64 bg-[#0a0a0a] border-r border-gray-900 flex flex-col hidden md:flex">
        <div class="p-6 border-b border-gray-900">
          <div class="flex items-center space-x-2 font-bold font-mono text-xl" [class]="themeStore.themeColor().text">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>DEV_PORTAL</span>
          </div>
          <p class="text-[10px] text-gray-600 mt-2 font-mono tracking-wider">SYSTEM VERSION: v3.1.0-stable</p>
        </div>

        <nav class="flex-1 py-6 space-y-1">
          <p class="px-6 text-xs font-mono text-gray-600 mb-2 uppercase tracking-widest">Navigation</p>

          @for (item of navItems; track item.path) {
            <a [routerLink]="item.path"
               routerLinkActive="active-nav-link"
               [routerLinkActiveOptions]="{ exact: item.path === '/' }"
               #rla="routerLinkActive"
               class="w-full flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-all border-l-2 cursor-pointer"
               [class]="rla.isActive
                 ? themeStore.themeColor().bg + ' border-current ' + themeStore.themeColor().text
                 : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="item.icon" />
              </svg>
              <span class="font-mono">{{ item.label }}</span>
            </a>
          }
        </nav>

        <div class="p-6 border-t border-gray-900">
          <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span class="font-mono">THEME ACCENT:</span>
            <span class="font-bold uppercase tracking-wider" [class]="themeStore.themeColor().text">{{ themeStore.theme() }}</span>
          </div>
          <div class="flex items-center space-x-3 text-xs text-gray-400">
            <div class="w-2.5 h-2.5 rounded-full animate-pulse" [class]="themeStore.themeColor().accent"></div>
            <span class="font-mono">Mainframe Active</span>
          </div>
        </div>
      </aside>

      <!-- Main Application Shell -->
      <div class="flex-1 flex flex-col relative">

        <!-- Mobile Header Navigation -->
        <header class="md:hidden p-4 border-b border-gray-900 flex justify-between items-center bg-[#0a0a0a]">
          <span class="font-bold font-mono text-lg" [class]="themeStore.themeColor().text">DEV_PORTAL</span>
          <div class="flex space-x-3">
            @for (item of navItems; track item.path) {
              <a [routerLink]="item.path"
                 routerLinkActive="active-nav-link"
                 [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                 #rlaMobile="routerLinkActive"
                 class="p-2 rounded hover:bg-white/5 cursor-pointer"
                 [class]="rlaMobile.isActive ? themeStore.themeColor().text : 'text-gray-400'">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="item.icon" />
                </svg>
              </a>
            }
          </div>
        </header>

        <!-- Dynamic Main Scroll Area -->
        <main class="flex-1 overflow-y-auto p-6 md:p-12 pb-56 scrollbar-hide">
          <router-outlet />
        </main>

        <!-- Terminal Footer (à extraire prochainement) -->
        <footer class="absolute bottom-0 left-0 right-0 bg-[#080808] border-t border-gray-900 transition-all duration-300 flex flex-col z-40"
             [class]="isTerminalOpen() ? 'h-56' : 'h-11'">

          <div class="flex items-center justify-between px-5 py-2.5 bg-[#0e0e0e] cursor-pointer hover:bg-[#121212] select-none"
               (click)="toggleTerminal()">
            <div class="flex items-center space-x-2 text-xs font-mono text-gray-400">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" [class]="themeStore.themeColor().text">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>BUILT-IN TERMINAL CONSOLE</span>
            </div>
            <div class="flex items-center space-x-2 text-xs text-gray-600">
              <span class="hidden sm:inline font-mono">Type 'help' to begin</span>
              <svg class="w-4 h-4 transition-transform duration-200"
                   [class.rotate-180]="isTerminalOpen()"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </div>

          @if (isTerminalOpen()) {
            <div class="flex-1 p-5 font-mono text-xs overflow-y-auto terminal-scroll space-y-2 bg-[#060606] text-gray-300">
              @for (line of terminalOutput(); track $index) {
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
                <input #terminalInputRef
                       type="text"
                       [value]="terminalInput()"
                       (input)="onTerminalInput($event)"
                       (keydown.enter)="handleCommand()"
                       class="flex-1 bg-transparent border-none outline-none text-gray-100 focus:ring-0 p-0 font-mono text-xs"
                       placeholder="Enter console command..."
                       autofocus />
              </div>
              <div #terminalBottomRef></div>
            </div>
          }
        </footer>
      </div>
    </div>
  `,
})
export class App {
  themeStore = inject(ThemeStore);
  private router = inject(Router);

  readonly navItems = [
    { path: '/', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z' },
    { path: '/about', label: 'About Me', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { path: '/skills', label: 'Tech Stack', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m21-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z' },
    { path: '/projects', label: 'Contributions', icon: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2' },
    { path: '/contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 11h3m-3-7l-3.11-2.07A2 2 0 007.89 8H3a2 2 0 00-2 2v8a2 2 0 002 2h18a2 2 0 002-2v-8a2 2 0 00-2-2h-4.89a2 2 0 00-1.11.31L13 12z' },
  ];

  isTerminalOpen = signal(true);
  terminalInput = signal('');
  terminalOutput = signal<Array<{ type: 'command' | 'response' | 'system' | 'error' | 'info'; content: string }>>([
    { type: 'system', content: 'SYSTEM INITIALIZED. Welcome to Dev_OS v3.1.0' },
    { type: 'info', content: 'Try typing commands like "neofetch", "theme amber", "cat bio", or "clear".' },
  ]);

  @ViewChild('terminalBottomRef') private terminalBottom!: ElementRef;
  @ViewChild('terminalInputRef') private terminalInputEl!: ElementRef;

  constructor() {
    effect(() => {
      this.terminalOutput();
      this.scrollToTerminalBottom();
    });
  }

  onTerminalInput(e: Event) {
    this.terminalInput.set((e.target as HTMLInputElement).value);
  }

  toggleTerminal() {
    this.isTerminalOpen.update(v => !v);
    if (this.isTerminalOpen()) {
      setTimeout(() => this.terminalInputEl?.nativeElement.focus(), 100);
    }
  }

  private scrollToTerminalBottom() {
    setTimeout(() => this.terminalBottom?.nativeElement.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  handleCommand() {
    const rawInput = this.terminalInput().trim();
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
        this.terminalOutput.set([]);
        this.terminalInput.set('');
        return;

      default:
        isError = true;
        response = `UNRECOGNIZED TERMINAL DIRECTIVE: "${cmd}". Type "help" to list valid instructions.`;
    }

    this.terminalOutput.update(output => [
      ...output,
      { type: 'command', content: rawInput },
      { type: isError ? 'error' : 'response', content: response },
    ]);
    this.terminalInput.set('');
  }
}