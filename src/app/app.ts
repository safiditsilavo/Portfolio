import { Component, inject } from '@angular/core';
import { ThemeStore } from './core/theme/theme.store';

@Component({
  selector: 'app-root',
  template: `<h1 [class]="themeStore.themeColor().text">Hello</h1>`,
})
export class App {
  themeStore = inject(ThemeStore);
}