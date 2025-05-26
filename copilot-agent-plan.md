# Copilot Agent – Build Plan: Angular 20 SSG Landing Page for "AI @ Work"

## 1. Framework & Constraints

- Use **Angular 19.x**
- Only **Standalone Components**
- Use **Signals** for state management
- Use new Angular APIs: `inject()`, `input()`, `output()`, `model()`, `provideRouter()`
- Use only `OnOush` change detection strategy
- **No `NgModules`**
- **No `Zone.js`**, use `provideExperimentalZonelessChangeDetection()` instead
- Enable **SSG** with `@angular/ssg`
- Content must be loaded from **Markdown files**
- Design system must support **light/dark theming**
- Final output must be **static**, buildable with:

```bash
ng run <project>:ssg
```

---

## 2. Required Packages

Install:
```bash
npm install @angular/ssg ngx-markdown marked prismjs
```

---

## 3. Project Structure

```plaintext
src/
├── app/
│   ├── main.ts
│   ├── app.routes.ts
│   ├── landing.page.ts
│   ├── theme-signal.ts
│   └── design-system/
│       ├── button.component.ts
│       ├── card.component.ts
│       ├── typography.component.ts
│       ├── navbar.component.ts
│       └── footer.component.ts
└── assets/
    └── content/
        ├── evento.md
        ├── sponsor.md
        └── speaker.md
```

---

## 4. Features

### 4.1 Markdown content
- Use ngx-markdown to render .md files

- Load files from /assets/content/

### 4.2 Theming
- Use CSS variables (:root) for theme tokens

- Create a signal<'light' | 'dark'> called themeSignal

- Use effect() to update DOM styles dynamically

- Theme preference must persist via localStorage

### 4.3 Static Site Generation
- Configure routes in routes.txt for all static pages

- Generate routes.txt dynamically or manually with:

```shell
/
#/evento
#/speaker
#/sponsor
```
- Build statically with:

```bash
Copia
ng run <project>:ssg
```

---

## 5. Core Functionality
- Responsive layout (Flex/Grid)

- Navbar with anchor navigation

- Render markdown sections (evento, sponsor, speaker, paper)

- External links/buttons (PDF, GitHub, etc.)

- Basic SEO using Angular Title and Meta services

---

## 6. Layout Specification – "AI @ Work"

### 6.1 General Style
- Fonts: sans-serif (Inter, Roboto)

- Colors: neutral (white/gray) + accent (blue/violet: #6366F1, #8B5CF6)

- Modular section layout

- Light/dark toggle (top-right)

### 6.2 Page Sections

```plaintext
- NAVBAR
  [Logo] [Evento] [Speaker] [Sponsor] [⬇] [Theme Toggle]

- HERO
  Title: "AI @ Work 2025"
  Subtitle: Short description
  CTA: [Download Paper] [Learn More ↓]

- ABOUT
  Event date, location, purpose
  Link to full agenda

- SPEAKERS
  List with name, role, short bio
  Link to individual paper (if any)

- SPONSORS
  Logo grid with external links

- PAPER
  Markdown-rendered abstract
  PDF download or inline viewer

- FOOTER
  Links: GitHub, Contacts, Privacy
```

### 6.3 Mobile Design
- Sticky navbar with burger menu

- ections stack vertically

- Smooth scroll between anchors

- Clear, tappable CTAs

- Paper section must remain readable

### 6.4 Animations (Optional)
- Fade/slide entrance for sections

- Hover effects for sponsor logos

- Syntax highlighting for markdown via PrismJS

---

## 7. CI/CD: Deploy on Netlify

### 7.1 Required Files
- Create netlify.toml in project root:

```toml
[build]
  command = "ng run <project>:ssg"
  publish = "dist/<project>"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 7.2 Optional
- Add .nvmrc for Node version

- Enable preview builds via Netlify GitHub integration

---

## 8. Initial Code Snippets

### 8.1 main.ts

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

bootstrapApplication(LandingPageComponent, {
  providers: [
    provideRouter(routes),
    provideExperimentalZonelessChangeDetection()
  ],
});
```

### 8.2 app.routes.ts
```ts
import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing.page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
];
```

### 8.3 landing.page.ts
```ts
import { Component, inject, effect } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [MarkdownModule],
  template: `
    <app-navbar />
    <section>
      <markdown src="assets/content/evento.md"></markdown>
    </section>
    <app-footer />
  `,
})
export class LandingPageComponent {}
```

### 8.4 theme-signal.ts
```ts
import { signal, effect } from '@angular/core';

export const themeSignal = signal<'light' | 'dark'>(
  localStorage.getItem('theme') as 'light' | 'dark' ?? 'light'
);

effect(() => {
  const theme = themeSignal();
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});
```