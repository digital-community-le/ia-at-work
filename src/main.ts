import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDDgUEZFABbdK7bzd65w_b7-LGGax9WFVw",
  authDomain: "ia-al-lavoro.firebaseapp.com",
  projectId: "ia-al-lavoro",
  storageBucket: "ia-al-lavoro.firebasestorage.app",
  messagingSenderId: "1053511788535",
  appId: "1:1053511788535:web:9c96b6301f8b292ec3b0f2",
  measurementId: "G-RFVKMS2DGP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
