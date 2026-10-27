# Decisions

- Follow the user’s conversion task, which explicitly authorizes changing application files, dependencies and lockfiles; onboarding-only preservation restrictions no longer describe this coding task.
- Use branch `template-conversion` and preserve all original code in Git history. Rebuild coupled patterns as neutral components instead of retaining business services under renamed identifiers.
- Use React Router browser history with one route registry for navigation and lazy route registration. Hosting must rewrite unknown paths to index.html.
- Use system fonts: no network font dependency, tracking script or external branded asset.
- Use Context for identity/theme/language and TanStack Query for asynchronous example data. No real backend or credentials are needed. Demo identity is explicitly labeled and never presented as production authentication.
- Default visitors to the dashboard; protect editing examples to demonstrate real guard behavior without making the entire gallery require a fake login. Demo role is member; an admin-only example demonstrates the 403 guard.
- Use Radix for focus management, dialogs, menus, tooltips, tabs and popovers; native inputs for standard form semantics. Tailwind 4 plus centralized CSS tokens replaces original mixed styling.
- Keep a small explicit exception to the function-component rule: React error boundaries require a class when using React’s native lifecycle API.
- Phase 1 has known baseline failures (Google Fonts production fetch; no lint command). Record these rather than claiming success or modifying the audit source before classifying it. Phase 2 removes the font dependency and adds lint.
- Optional Docker/CI will be added only after required functionality and checks pass. Optional language support uses a small typed dictionary for English/Swahili.

- Generic components are rebuilt from the original patterns because their implementations imported framework routing, identity and business services. This is a pattern-preserving migration, not a literal file move. Original chart concepts become Recharts wrappers as requested. Dates/numbers use Intl instead of adding a date library for basic formatting.
- Reusable exports are explicitly collected in `src/template-api.ts`. Knip treats it as a public entry point so requested extension helpers are retained; implementation-only unused files/dependencies are still reported.
- The full-content scrub intentionally retains domain vocabulary in ANALYSIS.md (historical classification), MIGRATION_NOTES.md and this decision record. Technical substring matches such as CSS `border`, `position`, `aria-*`/composed events, dependency package names, or package-lock integrity hashes are not business content and are retained. No old brand, service URL, business fixture or business route remains in runtime source.
- The original Next-specific AGENTS.md is replaced with Vite-specific guidance in this explicitly authorized migration. Old source and tracked SQLite data remain recoverable in Git history, not in the template working tree.
- Dependencies were resolved from npm latest stable tags on the task date, then bounded to installed major versions and locked. Node is pinned for reproducibility. No beta/next framework tag is selected.
- Native React error boundaries use the single justified class component. Other components use functions/hooks. LocalStorage failure falls back to in-memory UI state; tokens use memory only.
- Optional nginx Docker and GitHub Actions examples are included. Docker execution is not part of validated capabilities unless explicitly noted in the migration report.

- Content scrub uses both case-insensitive substring and whole-word searches. Intentional remaining substrings are: `border`/`position` CSS, `CartesianChart`/`CartesianGrid` math names, `POST` HTTP method, “compose”/“possibilities”/“purpose” neutral prose, “production” documentation, repository “checkout” instructions/actions, Docker `EXPOSE`, and registry package names/integrity hashes. Historical audit/migration documents necessarily name removed concepts. None is retained business functionality.
- Accessibility checks prompted darker muted/success colors, an underlined inline footer link, full-opacity auth-panel text, named popovers, chart values in accessible descriptions, and focus restoration for controlled dialogs. Automated scans complement rather than replace manual assistive-technology review.
