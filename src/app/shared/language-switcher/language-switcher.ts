import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-language-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center space-x-1 text-xs font-mono">
      <button (click)="setLang('fr')"
              class="px-2 py-1 rounded"
              [class]="activeLang() === 'fr' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'">
        FR
      </button>
      <span class="text-gray-700">/</span>
      <button (click)="setLang('en')"
              class="px-2 py-1 rounded"
              [class]="activeLang() === 'en' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'">
        EN
      </button>
    </div>
  `,
})
export class LanguageSwitcher {
  private transloco = inject(TranslocoService);

  protected activeLang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });

  setLang(lang: 'fr' | 'en') {
    this.transloco.setActiveLang(lang);
    localStorage.setItem('preferred-lang', lang);
  }
}