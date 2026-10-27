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
