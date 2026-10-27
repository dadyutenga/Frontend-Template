# Migration notes

## Result

The `template-conversion` branch converts the original application to `frontend-template`, a neutral React/Vite SPA. Git history is preserved, with separate audit, stack, application, scrub and quality commits. No remote push or deployment was performed.

## Kept and generalized

- Preserved the reusable concepts behind the responsive shell, sidebar, topbar, breadcrumbs, themes, menus, notification feed and profile/preferences screens.
- Consolidated repetitive list/detail/edit screens into a typed DataTable, mock record feature, schema-driven forms in modal/drawer/full-page layouts, tabbed details, summary panel and printable document.
- Replaced embedded SVG visualization code with reusable Recharts line/bar/area/pie wrappers, stat cards, trend indicators and date-filtered reports with CSV export.
- Generalized language selection to a small English/Swahili dictionary, date/number/currency helpers to Intl, and identity handling to an explicitly labeled demo scaffold.
- Added accessible primitives, component gallery, command search, feedback/error screens, shared hooks, typed fetch/interceptor infrastructure and TanStack Query examples.

## Removed

Next.js runtime/configuration, route proxy, external font downloads, old metadata/tracking scripts, business-specific routes, Django service calls/types, domain fixtures, subscription/location/payment flows, branded images, obsolete service worker, unused starter assets, stale folder documentation and the tracked SQLite database. Originals remain in Git history. There is no backend implementation in this template.

## New tooling

Vite 8, React 19 stable, strict TypeScript 6, React Router 7 with lazy page modules and route errors, Tailwind 4 semantic tokens, Radix, Recharts, TanStack Query, React Hook Form/Zod, ESLint flat config, Prettier, Vitest/Testing Library and Knip. Direct dependencies are bounded and the lockfile captures exact versions. Node 24.19.0 is pinned in `.nvmrc`.

## Validation performed

- Clean `npm ci` succeeded; development server restarted successfully afterward.
- `npm run build` passed (TypeScript and split production bundles).
- `npm run lint` passed with zero warnings.
- `npm test`: **8 tests passed across 4 files**, covering table sorting/search/filter/pagination/selection/column visibility, modal focus/Escape behavior, form validation/submission, anonymous access, member access and role denial.
- `npm run format:check` and `npm run check:unused` passed. Knip recognizes `src/template-api.ts` as the intentional reusable public API; it still checks implementation files and dependencies.
- Chromium visited dashboard, records, detail, reports, gallery, settings, guide, all four auth forms, 403/500 previews and a missing route. Main pages rendered without console errors or warnings.
- Browser interactions passed: demo login and protected redirect, create/edit/delete records, table empty state, sidebar collapse/expand, mobile drawer navigation, theme persistence, English/Swahili switching, command navigation, role guard, dialog focus return, date-range filtering and downloaded CSV contents.
- The interaction checks also passed against `vite preview`, exercising production assets rather than only the development server.
- axe-core WCAG A/AA scans reported no violations on the light dashboard, records, gallery, login, settings, reports, modal, column/notification popovers; or on dark dashboard/settings/login and the mobile navigation drawer. This is automated coverage, not a full assistive-technology certification.
- Case-insensitive content searches found no old brand, API hostname or domain terminology as runtime business content. Intentional technical/historical substring matches are documented in DECISIONS.md.

## Review before reuse

- Demo identity and records live in memory and reset on reload. Profile/settings preferences persist only in the browser. Replace mock authentication and the sample service adapter with a real, server-authorized implementation for your project.
- Date-range examples use October 2026 mock data. The language starter translates selected strings, not the entire application.
- The original pages are represented by reusable patterns rather than one neutral clone of every old business screen. Review the gallery and public API for your preferred extensions.
- Docker/nginx and GitHub Actions configurations are provided. The Docker image and hosted CI were **not executed** in this task; local equivalent application checks passed.
- Browser and axe checks used temporary external test tooling; the committed regression suite is Vitest/Testing Library and runs with `npm test`.
