# ChitFlow – Angular 22

Digital chit-fund management & live auctions. The original ChitFlow design (orange gradient, white cards,
phone-frame preview) rebuilt on the **latest Angular (22.2)** and enhanced with modern UI, animations and new features.

    npm install
    npm start          # http://localhost:4200
    npm run build      # production build  -> dist/chitflow
    npm test           # unit tests (Vitest)

Requires Node 20.19+ / 22.12+ / 24+.

## Modern Angular used
Standalone components only (no NgModules) · zoneless change detection (default in v22) · signals (`signal`, `computed`, `effect`,
`model`) · signal `input()` / `output()` · `@if / @for / @switch` control flow · `inject()` · `OnPush` everywhere ·
lazy-loaded routes · router input binding (`/groups/details?id=g1` -> `id = input<string>()`) · new file naming
(`home.ts`, `home.html`, `home.scss`, class `Home`).

## Project structure
```
src/
├─ styles.scss                 global entry (theme, animations, base, layout, components, forms)
├─ styles/
│  ├─ _global.scss             ← the one file every component imports:  @use 'global' as *;
│  ├─ _variables.scss          colours, gradients, radius, easing, phone size
│  ├─ _mixins.scss             flex helpers, glass, orb, reveal (stagger), interactive, text-gradient …
│  ├─ _theme.scss              light / dark CSS variables
│  ├─ _animations.scss         shared keyframes (fade-up, pop-in, float, shimmer, confetti …)
│  └─ _base / _layout / _components / _forms.scss
└─ app/
   ├─ app.ts / .html / .scss   phone frame + desktop showcase background
   ├─ app.routes.ts            every page lazy loaded
   ├─ core/
   │  ├─ models/               typed interfaces (group, member, payment, auction …)
   │  ├─ data/mock-data.ts     dummy data – replace with API calls in the services
   │  ├─ services/             group, member, payment, auction, report, notification, user, theme, toast
   │  └─ utils/                date, time (countdown), password-strength helpers
   ├─ layout/                  shell, status-bar, bottom-nav, drawer
   ├─ shared/                  icon, icon-tile, logo, page-header, tabs, progress-ring, sparkline, confetti,
   │                           group-card, member-item, payment-item, empty-state, toast-host, count-up, inr pipe
   └─ pages/                   25 screens – each folder has its own .ts, .html and .scss
```

## Styling
Each component owns its `.scss`. Reusable tokens/mixins come from one import:

```scss
@use 'global' as *;      // resolved via stylePreprocessorOptions.includePaths in angular.json
.card { background: $card; border-radius: $radius-card; @include interactive; }
```
Colours that change in dark mode are CSS variables (`$text`, `$card`, `$line` … map to `var(--cf-*)`), so dark mode
needs no extra work in components.

## What's new compared with the old version
* **Dark / light / auto theme** (Settings or the drawer), remembered between visits
* Page-enter transitions, staggered list reveals, count-up numbers, sliding tab indicator, progress rings, sparkline, confetti
* Toast notifications for actions, working search / filters / tabs on Groups, Members, Payments, Auctions, Notifications, Help
* **Login:** show/hide password, remember me, biometric shortcut, loading state
* **Register / Change password:** live password-strength meter and requirement checklist
* **Forgot password:** 3-step OTP flow (6-box OTP input with paste support, resend timer, success state)
* **Home:** greeting, hide-balance toggle, animated balance + trend, quick actions, live/next-auction card with countdown, group carousel
* **Create group:** live preview with computed monthly contribution, steppers; **Add member:** live avatar preview
* **Group details:** progress ring + month-by-month chit timeline
* **Make payment:** method cards, payment summary, processing state → **Receipt** with animated tick, confetti, share / copy
* **Auctions:** live pulse badge, countdowns; **Live auction:** ticking timer ring, simulated rival bids, quick-bid chips, outbid alerts
* **Auction result:** trophy, confetti, computed prize / dividend
* **Reports:** working period tabs, tappable bars with tooltip, collection-rate ring, per-group progress table

## Next steps
Swap the mock data in `core/data/mock-data.ts` for `HttpClient` calls inside the services – pages only talk to services,
so they will not need to change.
