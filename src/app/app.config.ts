import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'fr'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: (transloco: TranslocoService) => () => {
        const saved = localStorage.getItem('preferred-lang');
        if (saved) transloco.setActiveLang(saved);
      },
      deps: [TranslocoService],
      multi: true,
    },
  ],
};