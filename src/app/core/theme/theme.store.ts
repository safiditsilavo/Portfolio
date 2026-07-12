import { Injectable, computed, signal } from '@angular/core';

export type ThemeName = 'green' | 'amber' | 'blue' | 'purple';

export interface ThemeColor {
  text: string;
  border: string;
  bg: string;
  accent: string;
  focusRing: string;
  textMuted: string;
}

const THEME_COLORS: Record<ThemeName, ThemeColor> = {
  green: {
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/10',
    accent: 'bg-emerald-500',
    focusRing: 'focus:ring-emerald-500/50',
    textMuted: 'text-emerald-500/60',
  },
  amber: {
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/10',
    accent: 'bg-amber-500',
    focusRing: 'focus:ring-amber-500/50',
    textMuted: 'text-amber-500/60',
  },
  blue: {
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/10',
    accent: 'bg-cyan-500',
    focusRing: 'focus:ring-cyan-500/50',
    textMuted: 'text-cyan-500/60',
  },
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/10',
    accent: 'bg-purple-500',
    focusRing: 'focus:ring-purple-500/50',
    textMuted: 'text-purple-500/60',
  },
};

const GRADIENTS: Record<ThemeName, string> = {
  green: 'from-emerald-400 to-cyan-500',
  amber: 'from-amber-400 to-rose-500',
  blue: 'from-cyan-400 to-indigo-500',
  purple: 'from-purple-400 to-pink-500',
};

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly _theme = signal<ThemeName>('green');

  readonly theme = this._theme.asReadonly();

  readonly themeColor = computed(() => THEME_COLORS[this._theme()]);

  readonly gradientScheme = computed(() => GRADIENTS[this._theme()]);

  setTheme(theme: ThemeName): void {
    this._theme.set(theme);
  }

  isValidTheme(value: string): value is ThemeName {
    return value in THEME_COLORS;
  }
}