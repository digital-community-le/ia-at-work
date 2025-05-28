import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { FeatureToggleService } from './services/feature-toggle.service';
import { APP_FEATURES } from './app.config.token';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'call-for-speaker',
    loadComponent: () => import('./pages/call-for-speakers/call-for-speakers.component').then(m => m.CallForSpeakersComponent),
    //canMatch: [() => inject(FeatureToggleService).isFeatureEnabled(APP_FEATURES.callForSpeaker)]
  },
  {
    path: 'call-for-sponsor',
    loadComponent: () => import('./pages/call-for-sponsor/call-for-sponsor.component').then(m => m.CallForSponsorComponent),
    //canMatch: [() => inject(FeatureToggleService).isFeatureEnabled(APP_FEATURES.callForSponsor)]
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  }
];
