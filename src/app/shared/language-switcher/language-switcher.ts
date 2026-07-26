import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-language-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './language-switcher.html',
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