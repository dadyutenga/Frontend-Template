# Frontend Template

A reusable React + Vite + strict TypeScript workspace. All example metrics, records, activity and authentication are **mock demonstrations**. No backend, credentials or external fonts are required.

## Run

Use Node.js **24.19+** and npm **11+** (see `.nvmrc`).

```sh
npm ci
npm run dev
```

Other commands:

```sh
npm run build         # TypeScript + optimized, split production bundles
npm run preview       # Serve dist locally
npm run lint          # ESLint flat configuration, zero warnings
npm test              # Vitest + Testing Library
npm run format:check  # Prettier
npm run check:unused  # Knip, preserving the explicit template public API
```

For deployment, serve `dist/` and rewrite unknown paths to `index.html`. The included Docker image uses nginx with this fallback. Vite's development server is not a production server.

## Stack

React 19, Vite 8, TypeScript 6 strict mode, React Router 7 (`createBrowserRouter`), Tailwind CSS 4, Radix primitives, Recharts, TanStack Query 5, React Hook Form + Zod, Lucide icons, ESLint 10, Prettier, Vitest + Testing Library. Exact resolved versions are pinned in `package-lock.json`.

## Structure

```text
src/
  app/                    # Router, single route registry, providers
  components/
    ui/                   # Primitives, modal/drawer, toast
    shared/               # DataTable, charts, forms, documents, feedback
    layout/               # Separate dashboard/auth layouts
  features/
    auth/                 # In-memory demo identity and guards
    dashboard/            # Metrics, visualizations and activity
    example-crud/         # Typed service, queries/mutations, forms, list/detail
    reports/              # Date filters, charts, CSV download
    settings/             # Profile and persisted preferences
  hooks/                  # Debounce, storage, media query, outside click, pagination, disclosure
  lib/                    # API client, formatters, validation, constants, token helper
  pages/                  # Component gallery, guide and error pages
  styles/                 # Central tokens and Tailwind entry
  test/                   # Shared test setup
  types/                  # Shared example types
```

## Routes and adding a page

Dashboard `/`, records `/records`, detail `/records/:id`, protected creation `/records/new`, reports `/reports`, component gallery `/components`, guide `/example`, protected profile `/profile`, settings `/settings`, admin guard demonstration `/admin`, auth forms `/auth/{login,register,forgot-password,reset-password}`, error previews `/403`, `/500`, and a 404 fallback.

1. Create a default-exported component, e.g. `src/pages/Hello.tsx`.
2. Add **one** entry to `src/app/routes.ts`:

```tsx
{ path: '/hello', label: 'Hello', nav: true,
  load: () => import('@/pages/Hello') }
```

Add an icon if desired. That registry drives lazy-loaded routing, sidebar links, breadcrumbs and command search. Add `protected: true` for demo member access or `roles: ['admin']` for the role guard. Use `layout: 'auth'` for the separate auth layout.

## Components and forms

Import primitives from `@/components/ui`; add feature-neutral patterns to `components/shared`. `components/ui/index.ts` and `src/template-api.ts` define reusable exports. The `/components` gallery demonstrates controls, modal/drawer forms, feedback, a wizard, summary and printable document patterns. `RecordForm` is a full React Hook Form + Zod example; `FormField`, `FormInput` and `FormSelect` connect labels, validation and descriptions.

`DataTable<T>` accepts typed columns, values/renderers, stable row identifiers, optional row actions and bulk deletion callbacks. It provides client-side sorting, search, a column filter, pagination, page/individual selection, column visibility and filtered CSV export. Export escapes quotes and protects spreadsheet formula prefixes. For large datasets, adapt the service to server pagination rather than loading everything.

## Add an API call

Copy `.env.example` to `.env.local` only if you need to override defaults. In mock mode, record edits stay in module memory and reset on reload; navigation retains them. Settings preferences stay in localStorage. Demo identity resets on reload.

```tsx
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
interface Example {
  id: string;
  name: string;
}
export function useExamples() {
  return useQuery({
    queryKey: ['examples'],
    queryFn: ({ signal }) => api.request<Example[]>('examples', { signal }),
  });
}
```

Use mutations and invalidate relevant query keys after writes; see `features/example-crud/data.ts`. The fetch wrapper includes request/response interceptors, optional bearer injection, abort handling and normalized `ApiError`s. `api.interceptors.request.use(fn)` / `.response.use(fn)` return unsubscribe functions. The existing non-mock record adapter assumes a replaceable illustrative JSON contract: GET `records`, PUT `records/:id`, POST `records/bulk-delete`. This is an adapter example, **not an implemented backend**. Adapt it to your actual service before disabling mocks.

| Variable            | Default | Purpose                                            |
| ------------------- | ------- | -------------------------------------------------- |
| `VITE_API_BASE_URL` | `/api`  | Base URL for your own API adapter                  |
| `VITE_USE_MOCK_API` | `true`  | Only the literal `false` enables HTTP record calls |

Vite embeds `VITE_*` values in browser bundles. Never put secrets there.

## Authentication scaffold

Use any valid example email and a password of 8+ characters to start a demo member session. Register validates matching passwords; recovery/reset preview their success states without sending anything. No real account is created. `AuthProvider`, `ProtectedRoute`, the role guard and `tokenStorage` are extension points. Demo tokens never leave the browser. Real authorization belongs on a server; replace the scaffold with a server-verified session and preferably HttpOnly cookies before production use. `/admin` intentionally rejects demo members.

## Theme and language

Edit **`src/styles/tokens.css`** for semantic colors, radius, typography and base spacing. Light/dark/system preferences persist, react to system changes and are available through `useTheme()`. The topbar cycles modes; Settings offers an explicit selector. English/Swahili examples are configured in `app/providers.tsx`; Settings switches language and updates the document language. This is deliberately a small translation starter, not a claim of full localization.

## Validation and review

Tests exercise table sorting/filtering/pagination/selection/columns, modal focus/Escape behavior, schema-driven forms and anonymous/member/admin guards. See `MIGRATION_NOTES.md` for migration details and the final validation record. `ANALYSIS.md` documents every original file and discovered component; `DECISIONS.md` explains intentional tradeoffs. The original implementation remains in Git history.
