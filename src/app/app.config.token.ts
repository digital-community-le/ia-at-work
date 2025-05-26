import { InjectionToken } from '@angular/core';

export const APP_FEATURES = {
  eventTikets: "eventTikets",
  callForSpeaker: "callForSpeaker",
  callForSponsor: "callForSponsor",
} as const;

export type AppFeatures = typeof APP_FEATURES[keyof typeof APP_FEATURES];

export interface AppConfig {
  features: {
    [key in AppFeatures]: boolean;
  };
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({
    features: {
      eventTikets: false,
      callForSpeaker: true,
      callForSponsor: false,
    }
  }),
});
