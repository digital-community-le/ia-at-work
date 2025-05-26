import { Injectable, inject } from '@angular/core';
import { APP_CONFIG, AppFeatures } from '../app.config.token';

@Injectable({
  providedIn: 'root',
})
export class FeatureToggleService {
  readonly #config = inject(APP_CONFIG)

  isFeatureEnabled(route: AppFeatures): boolean {
    return this.#config.features[route] ?? false;
  }
}
