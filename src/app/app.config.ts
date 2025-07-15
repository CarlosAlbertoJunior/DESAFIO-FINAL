// src/app/app.config.ts

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router'; // <-- IMPORTANTE: Importe 'withInMemoryScrolling' aqui (remova withRouterConfig se estiver aqui)
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // <-- AGORA ESTÁ AQUI
        anchorScrolling: 'enabled', // Opcional: rola para âncoras (#id)
      })
    ),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
