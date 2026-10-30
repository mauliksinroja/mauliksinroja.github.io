import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // The page is prerendered to static HTML; hydration reuses that DOM
    // instead of re-rendering, and replays clicks made before it finishes.
    provideClientHydration(withEventReplay()),
  ],
};
