import {
  provideRouter,
  RouteReuseStrategy,
  withComponentInputBinding,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    provideIonicAngular({ mode: 'md', backButtonText: '' }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
});
