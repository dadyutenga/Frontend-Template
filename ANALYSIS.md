# Source audit (before conversion)

## Stack and workflow
Next.js 16.3.1, React/React DOM 19.2.4, TypeScript 5, npm lockfile. Node 24.19.0/npm 11.9.0 are installed. There is no src directory, test runner, lint command, class component, Redux, CRA or webpack configuration. Baseline npm ci and tsc pass. Public development routes respond successfully. Baseline production build fails because the network proxy denies Google Fonts. This is a pre-existing environment restriction, removed by using local system fonts in the Vite template. A lint phase check cannot run before lint is introduced in phase 2.

## Folder map and data flow
- app/: file-system routes, nested layouts, global stylesheet, metadata and bundled branded icon.
- components/: navigation, shell, menus, language context, marketing layout and review prompt.
- lib/: typed Django API client, JWT/cookie storage, deterministic domain fixtures, translations, currency/date helpers and HTML print generation.
- public/: branded photography, starter SVGs and a cache-first service worker.
- root: framework/TypeScript/deployment configuration and a tracked SQLite database without a server implementation.
Pages independently fetch through lib/api.ts, with local loading/error states. AppShell combines theme, active location and notifications, reads cached identity and redirects through Next navigation. A separate proxy checks cookie presence. Language and theme use localStorage. Documentation incorrectly describes all data as mock-only; current pages depend on an absent Django backend.

## Styling and reusable patterns
1,244 lines of global custom CSS plus extensive inline styling. Good reusable ideas: theme tokens, responsive shell/grid, compact tables, statistic cards, SVG chart layouts, form sections, tabbed details, summary panels, document printing, drawers, menus and notifications. These are generalized rather than retained with domain imports. Tailwind 4 utilities and a single token stylesheet replace overlapping styling and inline layout code. Native accessible controls and Radix interaction primitives support keyboard behavior.

## Dead or obsolete material
Legacy page.module.css, starter SVGs, stale folder READMEs, branded metadata/service worker and deployment assumptions are unnecessary in the neutral SPA. Domain fixtures coexist with real API usage; neither should become the template API. The SQLite file is not a usable backend and is removed. No runtime data from it is inspected or migrated.

## Every page
- `app/(marketing)/about/page.tsx`
- `app/(marketing)/contact/page.tsx`
- `app/(marketing)/page.tsx`
- `app/(marketing)/pricing/page.tsx`
- `app/(marketing)/privacy/page.tsx`
- `app/(marketing)/terms/page.tsx`
- `app/activate/page.tsx`
- `app/ai/page.tsx`
- `app/ai/usage/page.tsx`
- `app/analytics/cashflow/page.tsx`
- `app/analytics/customers/page.tsx`
- `app/analytics/page.tsx`
- `app/analytics/products/page.tsx`
- `app/analytics/sales/page.tsx`
- `app/auth/forgot-password/page.tsx`
- `app/auth/login/page.tsx`
- `app/auth/register/page.tsx`
- `app/credits/[id]/page.tsx`
- `app/credits/page.tsx`
- `app/customers/[id]/page.tsx`
- `app/customers/new/page.tsx`
- `app/customers/page.tsx`
- `app/dashboard/page.tsx`
- `app/discounts/[id]/page.tsx`
- `app/discounts/page.tsx`
- `app/expenses/[id]/page.tsx`
- `app/expenses/new/page.tsx`
- `app/expenses/page.tsx`
- `app/help/page.tsx`
- `app/inventory/[id]/page.tsx`
- `app/inventory/new/page.tsx`
- `app/inventory/page.tsx`
- `app/notebook/page.tsx`
- `app/pos/page.tsx`
- `app/profile/page.tsx`
- `app/reports/page.tsx`
- `app/settings/page.tsx`
- `app/staff/[id]/page.tsx`
- `app/staff/page.tsx`
- `app/stores/[id]/page.tsx`
- `app/stores/page.tsx`
- `app/suppliers/[id]/page.tsx`
- `app/suppliers/page.tsx`
- `app/transactions/[id]/page.tsx`
- `app/transactions/page.tsx`

## Component inventory (including page-local components)
- `app/(marketing)/about/layout.tsx:AboutLayout`
- `app/(marketing)/about/page.tsx:AboutPage`
- `app/(marketing)/contact/layout.tsx:ContactLayout`
- `app/(marketing)/contact/page.tsx:EmailIcon`
- `app/(marketing)/contact/page.tsx:WhatsAppIcon`
- `app/(marketing)/contact/page.tsx:LocationIcon`
- `app/(marketing)/contact/page.tsx:ContactPage`
- `app/(marketing)/layout.tsx:MarketingLayout`
- `app/(marketing)/page.tsx:Sparkline`
- `app/(marketing)/page.tsx:WindowChrome`
- `app/(marketing)/page.tsx:DashboardScreen`
- `app/(marketing)/page.tsx:InventoryScreen`
- `app/(marketing)/page.tsx:CreditsScreen`
- `app/(marketing)/page.tsx:TransactionsScreen`
- `app/(marketing)/page.tsx:POSScreen`
- `app/(marketing)/page.tsx:AppShellMockup`
- `app/(marketing)/page.tsx:LiveAppShowcase`
- `app/(marketing)/page.tsx:FeatureIllustration`
- `app/(marketing)/page.tsx:Hero`
- `app/(marketing)/page.tsx:TestimonialsSection`
- `app/(marketing)/page.tsx:FeatureCarousel`
- `app/(marketing)/page.tsx:AISection`
- `app/(marketing)/page.tsx:PricingTeaser`
- `app/(marketing)/page.tsx:FAQSection`
- `app/(marketing)/page.tsx:CTA`
- `app/(marketing)/page.tsx:LandingPage`
- `app/(marketing)/pricing/layout.tsx:PricingLayout`
- `app/(marketing)/pricing/page.tsx:Check`
- `app/(marketing)/pricing/page.tsx:Cross`
- `app/(marketing)/pricing/page.tsx:PricingPage`
- `app/(marketing)/privacy/layout.tsx:PrivacyLayout`
- `app/(marketing)/privacy/page.tsx:Section`
- `app/(marketing)/privacy/page.tsx:PrivacyPage`
- `app/(marketing)/terms/layout.tsx:TermsLayout`
- `app/(marketing)/terms/page.tsx:Section`
- `app/(marketing)/terms/page.tsx:TermsPage`
- `app/activate/page.tsx:ActivatePage`
- `app/ai/page.tsx:ThinkingDots`
- `app/ai/page.tsx:MessageBubble`
- `app/ai/page.tsx:MarkdownLite`
- `app/ai/page.tsx:TableRow`
- `app/ai/page.tsx:AIPage`
- `app/ai/usage/page.tsx:AIUsagePage`
- `app/analytics/_shared.tsx:AnalyticsNav`
- `app/analytics/_shared.tsx:AreaChart`
- `app/analytics/_shared.tsx:MiniSpark`
- `app/analytics/_shared.tsx:Donut`
- `app/analytics/_shared.tsx:AnalyticsHeader`
- `app/analytics/_shared.tsx:Spinner`
- `app/analytics/cashflow/page.tsx:CashflowPage`
- `app/analytics/customers/page.tsx:CustomersAnalyticsPage`
- `app/analytics/page.tsx:AnalyticsPage`
- `app/analytics/products/page.tsx:ProductsAnalyticsPage`
- `app/analytics/sales/page.tsx:SalesAnalyticsPage`
- `app/auth/forgot-password/page.tsx:ForgotPasswordPage`
- `app/auth/layout.tsx:AuthLayout`
- `app/auth/login/page.tsx:EyeIcon`
- `app/auth/login/page.tsx:LeftPanel`
- `app/auth/login/page.tsx:LoginPageContent`
- `app/auth/login/page.tsx:LoginPage`
- `app/auth/register/page.tsx:EyeIcon`
- `app/auth/register/page.tsx:CheckIcon`
- `app/auth/register/page.tsx:RegionCombobox`
- `app/auth/register/page.tsx:StepDots`
- `app/auth/register/page.tsx:LeftPanel`
- `app/auth/register/page.tsx:Field`
- `app/auth/register/page.tsx:PasswordStrength`
- `app/auth/register/page.tsx:RegisterPage`
- `app/credits/[id]/page.tsx:CreditDetailPage`
- `app/credits/page.tsx:StatusPill`
- `app/credits/page.tsx:AgingBar`
- `app/credits/page.tsx:RecordPaymentDrawer`
- `app/credits/page.tsx:Toast`
- `app/credits/page.tsx:IssueCreditDrawer`
- `app/credits/page.tsx:DraftMessagesModal`
- `app/credits/page.tsx:CreditsPage`
- `app/customers/[id]/page.tsx:Spinner`
- `app/customers/[id]/page.tsx:CustomerDetailPage`
- `app/customers/new/page.tsx:NewCustomerPage`
- `app/customers/page.tsx:GoogleG`
- `app/customers/page.tsx:Spinner`
- `app/customers/page.tsx:CustomersPage`
- `app/dashboard/page.tsx:KPI`
- `app/dashboard/page.tsx:CyclingKPI`
- `app/dashboard/page.tsx:AINudge`
- `app/dashboard/page.tsx:SalesChart`
- `app/dashboard/page.tsx:PaymentMix`
- `app/dashboard/page.tsx:StatusPill`
- `app/dashboard/page.tsx:RecentTransactions`
- `app/dashboard/page.tsx:TopProducts`
- `app/dashboard/page.tsx:LowStock`
- `app/dashboard/page.tsx:TodaySummary`
- `app/dashboard/page.tsx:DashboardPage`
- `app/discounts/[id]/page.tsx:SegmentBadge`
- `app/discounts/[id]/page.tsx:DiscountDetailPage`
- `app/discounts/page.tsx:Spinner`
- `app/discounts/page.tsx:Sparkline`
- `app/discounts/page.tsx:DiscountsPage`
- `app/expenses/[id]/page.tsx:EditModal`
- `app/expenses/[id]/page.tsx:DeleteModal`
- `app/expenses/[id]/page.tsx:ExpenseDetailPage`
- `app/expenses/new/page.tsx:NewExpensePage`
- `app/expenses/page.tsx:DeleteModal`
- `app/expenses/page.tsx:ExpensesPage`
- `app/help/page.tsx:FaqItem`
- `app/help/page.tsx:HelpPage`
- `app/inventory/[id]/page.tsx:SalesChart`
- `app/inventory/[id]/page.tsx:RestockModal`
- `app/inventory/[id]/page.tsx:AdjustModal`
- `app/inventory/[id]/page.tsx:EditModal`
- `app/inventory/[id]/page.tsx:ArchiveModal`
- `app/inventory/[id]/page.tsx:ProductDetailPage`
- `app/inventory/new/page.tsx:CategoryCombobox`
- `app/inventory/new/page.tsx:BarcodeField`
- `app/inventory/new/page.tsx:ProductCard`
- `app/inventory/new/page.tsx:NewProductPage`
- `app/inventory/page.tsx:ProductThumb`
- `app/inventory/page.tsx:StockBar`
- `app/inventory/page.tsx:BulkUploadModal`
- `app/inventory/page.tsx:RowMenu`
- `app/inventory/page.tsx:DeleteModal`
- `app/inventory/page.tsx:InventoryPage`
- `app/layout.tsx:RootLayout`
- `app/notebook/page.tsx:NoteMenu`
- `app/notebook/page.tsx:NoteModal`
- `app/notebook/page.tsx:NotebookPage`
- `app/pos/page.tsx:BarcodeIcon`
- `app/pos/page.tsx:CustomerAvatar`
- `app/pos/page.tsx:ReceiptModal`
- `app/pos/page.tsx:CustomerPickerModal`
- `app/pos/page.tsx:CartBottomBar`
- `app/pos/page.tsx:MobileCartSheet`
- `app/pos/page.tsx:ProductsSticky`
- `app/pos/page.tsx:ProductGrid`
- `app/pos/page.tsx:CartLineRow`
- `app/pos/page.tsx:CartPanel`
- `app/pos/page.tsx:POSPage`
- `app/profile/page.tsx:Field`
- `app/profile/page.tsx:ReadonlyField`
- `app/profile/page.tsx:PermBadge`
- `app/profile/page.tsx:VerificationCard`
- `app/profile/page.tsx:ProfilePage`
- `app/reports/page.tsx:Spinner`
- `app/reports/page.tsx:QuickExportCard`
- `app/reports/page.tsx:ToggleSwitch`
- `app/reports/page.tsx:AddScheduleModal`
- `app/reports/page.tsx:ScheduledTab`
- `app/reports/page.tsx:HistoryTab`
- `app/reports/page.tsx:ReportsPage`
- `app/settings/page.tsx:Toggle`
- `app/settings/page.tsx:TextInput`
- `app/settings/page.tsx:SelectInput`
- `app/settings/page.tsx:ToggleRow`
- `app/settings/page.tsx:StoreProfilePanel`
- `app/settings/page.tsx:TaxPanel`
- `app/settings/page.tsx:PaymentsPanel`
- `app/settings/page.tsx:ReceiptPanel`
- `app/settings/page.tsx:NotificationsPanel`
- `app/settings/page.tsx:IntegrationsPanel`
- `app/settings/page.tsx:PlaceholderPanel`
- `app/settings/page.tsx:SettingsPage`
- `app/staff/[id]/page.tsx:Spinner`
- `app/staff/[id]/page.tsx:PermToggle`
- `app/staff/[id]/page.tsx:WeekChart`
- `app/staff/[id]/page.tsx:StaffDetailPage`
- `app/staff/page.tsx:Spinner`
- `app/staff/page.tsx:Toast`
- `app/staff/page.tsx:ShiftDot`
- `app/staff/page.tsx:PermToggle`
- `app/staff/page.tsx:StaffPage`
- `app/stores/[id]/page.tsx:WeekBars`
- `app/stores/[id]/page.tsx:StoreDetailPage`
- `app/stores/page.tsx:WeekBars`
- `app/stores/page.tsx:MiniBar`
- `app/stores/page.tsx:StoresPage`
- `app/suppliers/[id]/page.tsx:Spinner`
- `app/suppliers/[id]/page.tsx:SupplierDetailPage`
- `app/suppliers/page.tsx:Spinner`
- `app/suppliers/page.tsx:Toast`
- `app/suppliers/page.tsx:SupplierDrawer`
- `app/suppliers/page.tsx:SuppliersPage`
- `app/transactions/[id]/page.tsx:StatusBig`
- `app/transactions/[id]/page.tsx:MethodBadge`
- `app/transactions/[id]/page.tsx:TotalRow`
- `app/transactions/[id]/page.tsx:Toast`
- `app/transactions/[id]/page.tsx:RefundModal`
- `app/transactions/[id]/page.tsx:AttachCustomerModal`
- `app/transactions/[id]/page.tsx:EmailReceiptModal`
- `app/transactions/[id]/page.tsx:TransactionDetailPage`
- `app/transactions/page.tsx:MethodPill`
- `app/transactions/page.tsx:StatusPill`
- `app/transactions/page.tsx:TransactionsPage`
- `components/DotsMenu.tsx:SunIcon`
- `components/DotsMenu.tsx:MoonIcon`
- `components/DotsMenu.tsx:DotsIcon`
- `components/DotsMenu.tsx:DotsMenu`
- `components/LangContext.tsx:LangProvider`
- `components/app-shell.tsx:AppShell`
- `components/bottom-nav.tsx:BottomNav`
- `components/icons.tsx:Icon`
- `components/marketing/MarketingFooter.tsx:MarketingFooter`
- `components/marketing/MarketingNav.tsx:MarketingNav`
- `components/review-prompt.tsx:StarRating`
- `components/review-prompt.tsx:ReviewPromptModal`
- `components/review-prompt.tsx:ReviewPrompt`
- `components/sidenav.tsx:StoreSwitcher`
- `components/sidenav.tsx:NavItem`
- `components/sidenav.tsx:Sidenav`
- `components/topbar.tsx:HamburgerIcon`
- `components/topbar.tsx:ThreeDotMenu`
- `components/topbar.tsx:Topbar`

## Full file classification
Every original tracked source/configuration/document/asset is listed below. GENERALIZE means retaining the reusable pattern through a neutral implementation, not preserving framework-coupled code verbatim. Git history preserves original implementations.

| Original file | Decision | Rationale |
|---|---|---|
| `.gitignore` | KEEP | Retain history and repository guidance; update framework-specific guidance after migration. |
| `AGENTS.md` | KEEP | Retain history and repository guidance; update framework-specific guidance after migration. |
| `CLAUDE.md` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `README.md` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/(marketing)/about/layout.tsx` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/(marketing)/about/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/(marketing)/contact/layout.tsx` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/(marketing)/contact/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/(marketing)/layout.tsx` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/(marketing)/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/(marketing)/pricing/layout.tsx` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/(marketing)/pricing/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/(marketing)/privacy/layout.tsx` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/(marketing)/privacy/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/(marketing)/terms/layout.tsx` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/(marketing)/terms/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/README.md` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/activate/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/ai/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/ai/usage/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/analytics/_shared.tsx` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/analytics/cashflow/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/analytics/customers/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/analytics/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/analytics/products/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/analytics/sales/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/auth/forgot-password/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/auth/layout.tsx` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/auth/login/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/auth/register/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/credits/[id]/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/credits/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/customers/[id]/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/customers/new/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/customers/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/dashboard/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/discounts/[id]/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/discounts/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/expenses/[id]/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/expenses/new/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/expenses/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/globals.css` | GENERALIZE | Retain language, auth, document or design-token concept with neutral typed implementation. |
| `app/help/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/icon.jpeg` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/inventory/[id]/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/inventory/new/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/inventory/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/layout.tsx` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/manifest.ts` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/notebook/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/page.module.css` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/pos/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/profile/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/reports/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/robots.ts` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/settings/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/sitemap.ts` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `app/staff/[id]/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/staff/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/stores/[id]/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/stores/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/suppliers/[id]/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/suppliers/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/transactions/[id]/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `app/transactions/page.tsx` | GENERALIZE | Extract layout, form, table or visualization pattern; remove domain data and network coupling. |
| `components/DotsMenu.tsx` | GENERALIZE | Preserve generic interaction patterns; replace framework navigation and business contexts. |
| `components/LangContext.tsx` | GENERALIZE | Preserve generic interaction patterns; replace framework navigation and business contexts. |
| `components/README.md` | GENERALIZE | Preserve generic interaction patterns; replace framework navigation and business contexts. |
| `components/app-shell.tsx` | GENERALIZE | Preserve generic interaction patterns; replace framework navigation and business contexts. |
| `components/bottom-nav.tsx` | GENERALIZE | Preserve generic interaction patterns; replace framework navigation and business contexts. |
| `components/icons.tsx` | GENERALIZE | Preserve generic interaction patterns; replace framework navigation and business contexts. |
| `components/marketing/MarketingFooter.tsx` | GENERALIZE | Preserve generic interaction patterns; replace framework navigation and business contexts. |
| `components/marketing/MarketingNav.tsx` | GENERALIZE | Preserve generic interaction patterns; replace framework navigation and business contexts. |
| `components/review-prompt.tsx` | GENERALIZE | Preserve generic interaction patterns; replace framework navigation and business contexts. |
| `components/sidenav.tsx` | GENERALIZE | Preserve generic interaction patterns; replace framework navigation and business contexts. |
| `components/topbar.tsx` | GENERALIZE | Preserve generic interaction patterns; replace framework navigation and business contexts. |
| `db.sqlite3` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `lib/README.md` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `lib/api.ts` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `lib/auth.ts` | GENERALIZE | Retain language, auth, document or design-token concept with neutral typed implementation. |
| `lib/data.ts` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `lib/lang.ts` | GENERALIZE | Retain language, auth, document or design-token concept with neutral typed implementation. |
| `lib/reportPdf.ts` | GENERALIZE | Retain language, auth, document or design-token concept with neutral typed implementation. |
| `lib/utils.ts` | GENERALIZE | Keep date/number helpers; make currency configurable and preserve negative amounts. |
| `next-env.d.ts` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `next.config.ts` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `package-lock.json` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `package.json` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `proxy.ts` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `public/README.md` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `public/file.svg` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `public/globe.svg` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `public/reeeg.jpeg` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `public/sw.js` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `public/window.svg` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `public/ziada-final.jpeg` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `public/ziadapos-login.jpeg` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `tsconfig.json` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `tsconfig.tsbuildinfo` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |
| `vercel.json` | DELETE | Replace obsolete framework/configuration, branded assets, domain service/data, or stale documentation. |

## Original symbol inventory

This expands the file-level classification above for original top-level components, hooks, utilities, constants, services and types. Page-local UI patterns classified GENERALIZE are consolidated into shared primitives, CRUD, dashboard, gallery, detail, and report patterns; framework/domain implementations are not retained.

| Original file | Symbol | Decision |
|---|---|---|
| `app/(marketing)/about/layout.tsx` | `metadata` | GENERALIZE |
| `app/(marketing)/about/layout.tsx` | `AboutLayout` | GENERALIZE |
| `app/(marketing)/about/page.tsx` | `AboutPage` | GENERALIZE |
| `app/(marketing)/contact/layout.tsx` | `metadata` | GENERALIZE |
| `app/(marketing)/contact/layout.tsx` | `ContactLayout` | GENERALIZE |
| `app/(marketing)/contact/page.tsx` | `EmailIcon` | GENERALIZE |
| `app/(marketing)/contact/page.tsx` | `WhatsAppIcon` | GENERALIZE |
| `app/(marketing)/contact/page.tsx` | `LocationIcon` | GENERALIZE |
| `app/(marketing)/contact/page.tsx` | `ContactPage` | GENERALIZE |
| `app/(marketing)/layout.tsx` | `metadata` | GENERALIZE |
| `app/(marketing)/layout.tsx` | `MarketingLayout` | GENERALIZE |
| `app/(marketing)/page.tsx` | `Sparkline` | GENERALIZE |
| `app/(marketing)/page.tsx` | `WindowChrome` | GENERALIZE |
| `app/(marketing)/page.tsx` | `Screen` | GENERALIZE |
| `app/(marketing)/page.tsx` | `SCREEN_ORDER` | GENERALIZE |
| `app/(marketing)/page.tsx` | `SCREEN_URLS` | GENERALIZE |
| `app/(marketing)/page.tsx` | `ROTATE_MS` | GENERALIZE |
| `app/(marketing)/page.tsx` | `DashboardScreen` | GENERALIZE |
| `app/(marketing)/page.tsx` | `InventoryScreen` | GENERALIZE |
| `app/(marketing)/page.tsx` | `CreditsScreen` | GENERALIZE |
| `app/(marketing)/page.tsx` | `TransactionsScreen` | GENERALIZE |
| `app/(marketing)/page.tsx` | `POSScreen` | GENERALIZE |
| `app/(marketing)/page.tsx` | `NAV_ITEMS` | GENERALIZE |
| `app/(marketing)/page.tsx` | `AppShellMockup` | GENERALIZE |
| `app/(marketing)/page.tsx` | `LiveAppShowcase` | GENERALIZE |
| `app/(marketing)/page.tsx` | `MODULE_META` | GENERALIZE |
| `app/(marketing)/page.tsx` | `getFeatures` | GENERALIZE |
| `app/(marketing)/page.tsx` | `FeatureIllustration` | GENERALIZE |
| `app/(marketing)/page.tsx` | `Hero` | GENERALIZE |
| `app/(marketing)/page.tsx` | `TestimonialsSection` | GENERALIZE |
| `app/(marketing)/page.tsx` | `FEAT_INTERVAL` | GENERALIZE |
| `app/(marketing)/page.tsx` | `FeatureCarousel` | GENERALIZE |
| `app/(marketing)/page.tsx` | `AISection` | GENERALIZE |
| `app/(marketing)/page.tsx` | `PricingTeaser` | GENERALIZE |
| `app/(marketing)/page.tsx` | `FAQSection` | GENERALIZE |
| `app/(marketing)/page.tsx` | `CTA` | GENERALIZE |
| `app/(marketing)/page.tsx` | `LandingPage` | GENERALIZE |
| `app/(marketing)/pricing/layout.tsx` | `metadata` | GENERALIZE |
| `app/(marketing)/pricing/layout.tsx` | `PricingLayout` | GENERALIZE |
| `app/(marketing)/pricing/page.tsx` | `Check` | GENERALIZE |
| `app/(marketing)/pricing/page.tsx` | `Cross` | GENERALIZE |
| `app/(marketing)/pricing/page.tsx` | `PLANS` | GENERALIZE |
| `app/(marketing)/pricing/page.tsx` | `MATRIX` | GENERALIZE |
| `app/(marketing)/pricing/page.tsx` | `renderCell` | GENERALIZE |
| `app/(marketing)/pricing/page.tsx` | `fmt` | GENERALIZE |
| `app/(marketing)/pricing/page.tsx` | `PricingPage` | GENERALIZE |
| `app/(marketing)/privacy/layout.tsx` | `metadata` | GENERALIZE |
| `app/(marketing)/privacy/layout.tsx` | `PrivacyLayout` | GENERALIZE |
| `app/(marketing)/privacy/page.tsx` | `Section` | GENERALIZE |
| `app/(marketing)/privacy/page.tsx` | `PrivacyPage` | GENERALIZE |
| `app/(marketing)/terms/layout.tsx` | `metadata` | GENERALIZE |
| `app/(marketing)/terms/layout.tsx` | `TermsLayout` | GENERALIZE |
| `app/(marketing)/terms/page.tsx` | `Section` | GENERALIZE |
| `app/(marketing)/terms/page.tsx` | `TermsPage` | GENERALIZE |
| `app/activate/page.tsx` | `ActivatePage` | GENERALIZE |
| `app/ai/page.tsx` | `Message` | GENERALIZE |
| `app/ai/page.tsx` | `DEFAULT_PROMPTS` | GENERALIZE |
| `app/ai/page.tsx` | `welcomeMessage` | GENERALIZE |
| `app/ai/page.tsx` | `SpeechResultAlt` | GENERALIZE |
| `app/ai/page.tsx` | `SpeechRecognitionLike` | GENERALIZE |
| `app/ai/page.tsx` | `SpeechRecognitionCtor` | GENERALIZE |
| `app/ai/page.tsx` | `useMediaQuery` | GENERALIZE |
| `app/ai/page.tsx` | `useKeyboardInset` | DELETE |
| `app/ai/page.tsx` | `ThinkingDots` | GENERALIZE |
| `app/ai/page.tsx` | `MessageBubble` | GENERALIZE |
| `app/ai/page.tsx` | `MarkdownLite` | GENERALIZE |
| `app/ai/page.tsx` | `TableRow` | GENERALIZE |
| `app/ai/page.tsx` | `renderInline` | GENERALIZE |
| `app/ai/page.tsx` | `AIPage` | GENERALIZE |
| `app/ai/usage/page.tsx` | `SPINNER` | GENERALIZE |
| `app/ai/usage/page.tsx` | `AIUsagePage` | GENERALIZE |
| `app/analytics/_shared.tsx` | `AnalyticsNav` | GENERALIZE |
| `app/analytics/_shared.tsx` | `fmtAxis` | GENERALIZE |
| `app/analytics/_shared.tsx` | `niceMax` | GENERALIZE |
| `app/analytics/_shared.tsx` | `smoothCurve` | GENERALIZE |
| `app/analytics/_shared.tsx` | `AreaChart` | GENERALIZE |
| `app/analytics/_shared.tsx` | `MiniSpark` | GENERALIZE |
| `app/analytics/_shared.tsx` | `Donut` | GENERALIZE |
| `app/analytics/_shared.tsx` | `AnalyticsHeader` | GENERALIZE |
| `app/analytics/_shared.tsx` | `rangeToParams` | GENERALIZE |
| `app/analytics/_shared.tsx` | `Spinner` | GENERALIZE |
| `app/analytics/cashflow/page.tsx` | `PAYMENT_COLORS` | GENERALIZE |
| `app/analytics/cashflow/page.tsx` | `paymentColor` | GENERALIZE |
| `app/analytics/cashflow/page.tsx` | `CashflowPage` | GENERALIZE |
| `app/analytics/customers/page.tsx` | `SEG_COLORS` | GENERALIZE |
| `app/analytics/customers/page.tsx` | `avatarStyle` | GENERALIZE |
| `app/analytics/customers/page.tsx` | `CustomersAnalyticsPage` | GENERALIZE |
| `app/analytics/page.tsx` | `PAYMENT_COLORS` | GENERALIZE |
| `app/analytics/page.tsx` | `paymentColor` | GENERALIZE |
| `app/analytics/page.tsx` | `AnalyticsPage` | GENERALIZE |
| `app/analytics/products/page.tsx` | `CAT_COLORS` | GENERALIZE |
| `app/analytics/products/page.tsx` | `ProductsAnalyticsPage` | GENERALIZE |
| `app/analytics/sales/page.tsx` | `SalesAnalyticsPage` | GENERALIZE |
| `app/auth/forgot-password/page.tsx` | `Step` | GENERALIZE |
| `app/auth/forgot-password/page.tsx` | `ForgotPasswordPage` | GENERALIZE |
| `app/auth/layout.tsx` | `metadata` | GENERALIZE |
| `app/auth/layout.tsx` | `AuthLayout` | GENERALIZE |
| `app/auth/login/page.tsx` | `EyeIcon` | GENERALIZE |
| `app/auth/login/page.tsx` | `LeftPanel` | GENERALIZE |
| `app/auth/login/page.tsx` | `LoginPageContent` | GENERALIZE |
| `app/auth/login/page.tsx` | `LoginPage` | GENERALIZE |
| `app/auth/register/page.tsx` | `EyeIcon` | GENERALIZE |
| `app/auth/register/page.tsx` | `CheckIcon` | GENERALIZE |
| `app/auth/register/page.tsx` | `RegionComboboxProps` | GENERALIZE |
| `app/auth/register/page.tsx` | `RegionCombobox` | GENERALIZE |
| `app/auth/register/page.tsx` | `StepDots` | GENERALIZE |
| `app/auth/register/page.tsx` | `LeftPanel` | GENERALIZE |
| `app/auth/register/page.tsx` | `FieldProps` | GENERALIZE |
| `app/auth/register/page.tsx` | `Field` | GENERALIZE |
| `app/auth/register/page.tsx` | `PasswordStrength` | GENERALIZE |
| `app/auth/register/page.tsx` | `TOTAL_STEPS` | GENERALIZE |
| `app/auth/register/page.tsx` | `RegisterPage` | GENERALIZE |
| `app/credits/[id]/page.tsx` | `SPINNER` | GENERALIZE |
| `app/credits/[id]/page.tsx` | `CreditDetailPage` | GENERALIZE |
| `app/credits/page.tsx` | `SPINNER` | GENERALIZE |
| `app/credits/page.tsx` | `PhoneIcon` | GENERALIZE |
| `app/credits/page.tsx` | `WhatsAppMini` | GENERALIZE |
| `app/credits/page.tsx` | `CashSmall` | GENERALIZE |
| `app/credits/page.tsx` | `avatarFromName` | GENERALIZE |
| `app/credits/page.tsx` | `StatusPill` | GENERALIZE |
| `app/credits/page.tsx` | `AgingBucket` | GENERALIZE |
| `app/credits/page.tsx` | `AgingBar` | GENERALIZE |
| `app/credits/page.tsx` | `RecordPaymentDrawer` | GENERALIZE |
| `app/credits/page.tsx` | `Toast` | GENERALIZE |
| `app/credits/page.tsx` | `IssueCreditDrawer` | GENERALIZE |
| `app/credits/page.tsx` | `DraftMessagesModal` | GENERALIZE |
| `app/credits/page.tsx` | `CreditsPage` | GENERALIZE |
| `app/customers/[id]/page.tsx` | `SmsIcon` | GENERALIZE |
| `app/customers/[id]/page.tsx` | `daysAgoLabel` | GENERALIZE |
| `app/customers/[id]/page.tsx` | `monthLabel` | GENERALIZE |
| `app/customers/[id]/page.tsx` | `SEGMENT_COLORS` | GENERALIZE |
| `app/customers/[id]/page.tsx` | `Spinner` | GENERALIZE |
| `app/customers/[id]/page.tsx` | `CustomerDetailPage` | GENERALIZE |
| `app/customers/new/page.tsx` | `Segment` | GENERALIZE |
| `app/customers/new/page.tsx` | `SEGMENT_META` | GENERALIZE |
| `app/customers/new/page.tsx` | `NewCustomerPage` | GENERALIZE |
| `app/customers/page.tsx` | `Segment` | GENERALIZE |
| `app/customers/page.tsx` | `SEGMENT_COLORS` | GENERALIZE |
| `app/customers/page.tsx` | `SORT_OPTIONS` | GENERALIZE |
| `app/customers/page.tsx` | `daysAgoLabel` | GENERALIZE |
| `app/customers/page.tsx` | `GoogleG` | GENERALIZE |
| `app/customers/page.tsx` | `Spinner` | GENERALIZE |
| `app/customers/page.tsx` | `CustomersPage` | GENERALIZE |
| `app/dashboard/page.tsx` | `KPI` | GENERALIZE |
| `app/dashboard/page.tsx` | `CyclingKPI` | GENERALIZE |
| `app/dashboard/page.tsx` | `NUDGE_DURATION` | GENERALIZE |
| `app/dashboard/page.tsx` | `AINudge` | GENERALIZE |
| `app/dashboard/page.tsx` | `fmtAxis` | GENERALIZE |
| `app/dashboard/page.tsx` | `niceMax` | GENERALIZE |
| `app/dashboard/page.tsx` | `smoothCurve` | GENERALIZE |
| `app/dashboard/page.tsx` | `ChartView` | GENERALIZE |
| `app/dashboard/page.tsx` | `CHART_VIEWS` | GENERALIZE |
| `app/dashboard/page.tsx` | `AUTO_CYCLE` | GENERALIZE |
| `app/dashboard/page.tsx` | `AUTO_DURATIONS` | GENERALIZE |
| `app/dashboard/page.tsx` | `SalesChart` | GENERALIZE |
| `app/dashboard/page.tsx` | `METHOD_COLORS` | GENERALIZE |
| `app/dashboard/page.tsx` | `PaymentMix` | GENERALIZE |
| `app/dashboard/page.tsx` | `StatusPill` | GENERALIZE |
| `app/dashboard/page.tsx` | `RecentTransactions` | GENERALIZE |
| `app/dashboard/page.tsx` | `TopProducts` | GENERALIZE |
| `app/dashboard/page.tsx` | `LowStock` | GENERALIZE |
| `app/dashboard/page.tsx` | `TodaySummary` | GENERALIZE |
| `app/dashboard/page.tsx` | `RANGE_LABELS` | GENERALIZE |
| `app/dashboard/page.tsx` | `getRangeDates` | GENERALIZE |
| `app/dashboard/page.tsx` | `greeting` | GENERALIZE |
| `app/dashboard/page.tsx` | `DashboardPage` | GENERALIZE |
| `app/discounts/[id]/page.tsx` | `DiscountLine` | GENERALIZE |
| `app/discounts/[id]/page.tsx` | `DiscountDetail` | GENERALIZE |
| `app/discounts/[id]/page.tsx` | `MOCK_DISCOUNTS` | GENERALIZE |
| `app/discounts/[id]/page.tsx` | `SegmentBadge` | GENERALIZE |
| `app/discounts/[id]/page.tsx` | `DiscountDetailPage` | GENERALIZE |
| `app/discounts/page.tsx` | `rangeToParams` | GENERALIZE |
| `app/discounts/page.tsx` | `Spinner` | GENERALIZE |
| `app/discounts/page.tsx` | `Sparkline` | GENERALIZE |
| `app/discounts/page.tsx` | `DiscountsPage` | GENERALIZE |
| `app/expenses/[id]/page.tsx` | `SPINNER` | GENERALIZE |
| `app/expenses/[id]/page.tsx` | `MODAL_OVERLAY_STYLE` | GENERALIZE |
| `app/expenses/[id]/page.tsx` | `MODAL_BOX_STYLE` | GENERALIZE |
| `app/expenses/[id]/page.tsx` | `INPUT_S` | GENERALIZE |
| `app/expenses/[id]/page.tsx` | `LABEL_S` | GENERALIZE |
| `app/expenses/[id]/page.tsx` | `EXPENSE_CATEGORIES` | GENERALIZE |
| `app/expenses/[id]/page.tsx` | `PAYMENT_METHODS` | GENERALIZE |
| `app/expenses/[id]/page.tsx` | `CATEGORY_COLORS` | GENERALIZE |
| `app/expenses/[id]/page.tsx` | `catColor` | GENERALIZE |
| `app/expenses/[id]/page.tsx` | `EditModal` | GENERALIZE |
| `app/expenses/[id]/page.tsx` | `DeleteModal` | GENERALIZE |
| `app/expenses/[id]/page.tsx` | `ExpenseDetailPage` | GENERALIZE |
| `app/expenses/new/page.tsx` | `INPUT` | GENERALIZE |
| `app/expenses/new/page.tsx` | `LABEL` | GENERALIZE |
| `app/expenses/new/page.tsx` | `SECTION_CARD` | GENERALIZE |
| `app/expenses/new/page.tsx` | `SECTION_HEAD` | GENERALIZE |
| `app/expenses/new/page.tsx` | `EXPENSE_CATEGORIES` | GENERALIZE |
| `app/expenses/new/page.tsx` | `PAYMENT_METHODS` | GENERALIZE |
| `app/expenses/new/page.tsx` | `NewExpensePage` | GENERALIZE |
| `app/expenses/page.tsx` | `SPINNER` | GENERALIZE |
| `app/expenses/page.tsx` | `EXPENSE_CATEGORIES` | GENERALIZE |
| `app/expenses/page.tsx` | `EXPENSE_METHODS` | GENERALIZE |
| `app/expenses/page.tsx` | `CATEGORY_COLORS` | GENERALIZE |
| `app/expenses/page.tsx` | `categoryColor` | GENERALIZE |
| `app/expenses/page.tsx` | `categoryPill` | GENERALIZE |
| `app/expenses/page.tsx` | `DeleteModal` | GENERALIZE |
| `app/expenses/page.tsx` | `ExpensesPage` | GENERALIZE |
| `app/help/page.tsx` | `QUICK_ACTIONS` | GENERALIZE |
| `app/help/page.tsx` | `ARTICLES` | GENERALIZE |
| `app/help/page.tsx` | `FAQS` | GENERALIZE |
| `app/help/page.tsx` | `PILL_CLASSES` | GENERALIZE |
| `app/help/page.tsx` | `FaqItem` | GENERALIZE |
| `app/help/page.tsx` | `HelpPage` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `SPINNER` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `COLOR_SCHEMES` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `generateMovements` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `SalesChart` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `MODAL_OVERLAY_STYLE` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `MODAL_BOX_STYLE` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `INPUT_S` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `LABEL_S` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `RestockModal` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `AdjustModal` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `EditModal` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `ArchiveModal` | GENERALIZE |
| `app/inventory/[id]/page.tsx` | `ProductDetailPage` | GENERALIZE |
| `app/inventory/new/page.tsx` | `CategoryComboboxProps` | GENERALIZE |
| `app/inventory/new/page.tsx` | `CategoryCombobox` | GENERALIZE |
| `app/inventory/new/page.tsx` | `ProductDraft` | GENERALIZE |
| `app/inventory/new/page.tsx` | `makeEmpty` | GENERALIZE |
| `app/inventory/new/page.tsx` | `validate` | GENERALIZE |
| `app/inventory/new/page.tsx` | `ProductCardProps` | GENERALIZE |
| `app/inventory/new/page.tsx` | `INPUT` | GENERALIZE |
| `app/inventory/new/page.tsx` | `LABEL` | GENERALIZE |
| `app/inventory/new/page.tsx` | `SECTION_CARD` | GENERALIZE |
| `app/inventory/new/page.tsx` | `SECTION_HEAD` | GENERALIZE |
| `app/inventory/new/page.tsx` | `BarcodeField` | GENERALIZE |
| `app/inventory/new/page.tsx` | `ProductCard` | GENERALIZE |
| `app/inventory/new/page.tsx` | `NewProductPage` | GENERALIZE |
| `app/inventory/page.tsx` | `COLOR_SCHEMES` | GENERALIZE |
| `app/inventory/page.tsx` | `statusFor` | GENERALIZE |
| `app/inventory/page.tsx` | `ProductThumb` | GENERALIZE |
| `app/inventory/page.tsx` | `StockBar` | GENERALIZE |
| `app/inventory/page.tsx` | `CSV_HEADERS` | GENERALIZE |
| `app/inventory/page.tsx` | `CSV_TEMPLATE` | GENERALIZE |
| `app/inventory/page.tsx` | `downloadTemplate` | GENERALIZE |
| `app/inventory/page.tsx` | `BulkUploadModal` | GENERALIZE |
| `app/inventory/page.tsx` | `MenuState` | GENERALIZE |
| `app/inventory/page.tsx` | `RowMenu` | GENERALIZE |
| `app/inventory/page.tsx` | `DeleteModal` | GENERALIZE |
| `app/inventory/page.tsx` | `TableViewIcon` | GENERALIZE |
| `app/inventory/page.tsx` | `GridViewIcon` | GENERALIZE |
| `app/inventory/page.tsx` | `InventoryPage` | GENERALIZE |
| `app/layout.tsx` | `inter` | GENERALIZE |
| `app/layout.tsx` | `jetbrainsMono` | GENERALIZE |
| `app/layout.tsx` | `SITE_URL` | GENERALIZE |
| `app/layout.tsx` | `viewport` | GENERALIZE |
| `app/layout.tsx` | `metadata` | GENERALIZE |
| `app/layout.tsx` | `GTAG_ID` | GENERALIZE |
| `app/layout.tsx` | `jsonLd` | GENERALIZE |
| `app/layout.tsx` | `RootLayout` | GENERALIZE |
| `app/manifest.ts` | `manifest` | DELETE |
| `app/notebook/page.tsx` | `SPINNER` | GENERALIZE |
| `app/notebook/page.tsx` | `FOLDERS` | GENERALIZE |
| `app/notebook/page.tsx` | `TAG_TONE` | GENERALIZE |
| `app/notebook/page.tsx` | `tagPillClass` | GENERALIZE |
| `app/notebook/page.tsx` | `matchesFolder` | GENERALIZE |
| `app/notebook/page.tsx` | `NoteMenu` | GENERALIZE |
| `app/notebook/page.tsx` | `ModalProps` | GENERALIZE |
| `app/notebook/page.tsx` | `NoteModal` | GENERALIZE |
| `app/notebook/page.tsx` | `NotebookPage` | GENERALIZE |
| `app/pos/page.tsx` | `CartItem` | GENERALIZE |
| `app/pos/page.tsx` | `Cart` | GENERALIZE |
| `app/pos/page.tsx` | `POSCustomer` | GENERALIZE |
| `app/pos/page.tsx` | `SEGMENT_COLORS` | GENERALIZE |
| `app/pos/page.tsx` | `COLOR_SCHEMES` | GENERALIZE |
| `app/pos/page.tsx` | `BarcodeIcon` | GENERALIZE |
| `app/pos/page.tsx` | `PauseIcon` | GENERALIZE |
| `app/pos/page.tsx` | `TrashIcon` | GENERALIZE |
| `app/pos/page.tsx` | `CartIcon` | GENERALIZE |
| `app/pos/page.tsx` | `CheckBigIcon` | GENERALIZE |
| `app/pos/page.tsx` | `CustomerAvatar` | GENERALIZE |
| `app/pos/page.tsx` | `ReceiptModal` | GENERALIZE |
| `app/pos/page.tsx` | `CustomerPickerModal` | GENERALIZE |
| `app/pos/page.tsx` | `CartBottomBar` | GENERALIZE |
| `app/pos/page.tsx` | `MobileCartSheet` | GENERALIZE |
| `app/pos/page.tsx` | `ProductsSticky` | GENERALIZE |
| `app/pos/page.tsx` | `ProductGrid` | GENERALIZE |
| `app/pos/page.tsx` | `CartLineRow` | GENERALIZE |
| `app/pos/page.tsx` | `CartPanel` | GENERALIZE |
| `app/pos/page.tsx` | `POSPage` | GENERALIZE |
| `app/profile/page.tsx` | `Tab` | GENERALIZE |
| `app/profile/page.tsx` | `PROFILE` | GENERALIZE |
| `app/profile/page.tsx` | `ACTIVITY` | GENERALIZE |
| `app/profile/page.tsx` | `ACTIVITY_COLORS` | GENERALIZE |
| `app/profile/page.tsx` | `Field` | GENERALIZE |
| `app/profile/page.tsx` | `ReadonlyField` | GENERALIZE |
| `app/profile/page.tsx` | `PermBadge` | GENERALIZE |
| `app/profile/page.tsx` | `VerificationCard` | GENERALIZE |
| `app/profile/page.tsx` | `ProfilePage` | GENERALIZE |
| `app/reports/page.tsx` | `RANGE_OPTIONS` | GENERALIZE |
| `app/reports/page.tsx` | `FREQ_OPTIONS` | GENERALIZE |
| `app/reports/page.tsx` | `TYPE_OPTIONS` | GENERALIZE |
| `app/reports/page.tsx` | `colorVar` | GENERALIZE |
| `app/reports/page.tsx` | `softVar` | GENERALIZE |
| `app/reports/page.tsx` | `lineVar` | GENERALIZE |
| `app/reports/page.tsx` | `freqColor` | GENERALIZE |
| `app/reports/page.tsx` | `freqSoft` | GENERALIZE |
| `app/reports/page.tsx` | `freqLine` | GENERALIZE |
| `app/reports/page.tsx` | `Spinner` | GENERALIZE |
| `app/reports/page.tsx` | `QuickExportCard` | GENERALIZE |
| `app/reports/page.tsx` | `ToggleSwitch` | GENERALIZE |
| `app/reports/page.tsx` | `AddScheduleModal` | GENERALIZE |
| `app/reports/page.tsx` | `ScheduledTab` | GENERALIZE |
| `app/reports/page.tsx` | `HistoryTab` | GENERALIZE |
| `app/reports/page.tsx` | `ReportsPage` | GENERALIZE |
| `app/robots.ts` | `robots` | DELETE |
| `app/settings/page.tsx` | `Toggle` | GENERALIZE |
| `app/settings/page.tsx` | `TextInput` | GENERALIZE |
| `app/settings/page.tsx` | `SelectInput` | GENERALIZE |
| `app/settings/page.tsx` | `ToggleRow` | GENERALIZE |
| `app/settings/page.tsx` | `SECTIONS` | GENERALIZE |
| `app/settings/page.tsx` | `StoreProfilePanel` | GENERALIZE |
| `app/settings/page.tsx` | `TaxPanel` | GENERALIZE |
| `app/settings/page.tsx` | `PaymentsPanel` | GENERALIZE |
| `app/settings/page.tsx` | `ReceiptPanel` | GENERALIZE |
| `app/settings/page.tsx` | `NotificationsPanel` | GENERALIZE |
| `app/settings/page.tsx` | `IntegrationsPanel` | GENERALIZE |
| `app/settings/page.tsx` | `PlaceholderPanel` | GENERALIZE |
| `app/settings/page.tsx` | `SettingsPage` | GENERALIZE |
| `app/sitemap.ts` | `BASE` | DELETE |
| `app/sitemap.ts` | `sitemap` | DELETE |
| `app/staff/[id]/page.tsx` | `ShiftKey` | GENERALIZE |
| `app/staff/[id]/page.tsx` | `ActivityEntry` | GENERALIZE |
| `app/staff/[id]/page.tsx` | `SHIFT_HOURS` | GENERALIZE |
| `app/staff/[id]/page.tsx` | `normalizeShift` | GENERALIZE |
| `app/staff/[id]/page.tsx` | `normalizeStatus` | GENERALIZE |
| `app/staff/[id]/page.tsx` | `getRolePill` | GENERALIZE |
| `app/staff/[id]/page.tsx` | `getStatusPill` | GENERALIZE |
| `app/staff/[id]/page.tsx` | `mockActivity` | GENERALIZE |
| `app/staff/[id]/page.tsx` | `Spinner` | GENERALIZE |
| `app/staff/[id]/page.tsx` | `PermToggle` | GENERALIZE |
| `app/staff/[id]/page.tsx` | `WeekChart` | GENERALIZE |
| `app/staff/[id]/page.tsx` | `StaffDetailPage` | GENERALIZE |
| `app/staff/page.tsx` | `initials` | GENERALIZE |
| `app/staff/page.tsx` | `Spinner` | GENERALIZE |
| `app/staff/page.tsx` | `Toast` | GENERALIZE |
| `app/staff/page.tsx` | `getRolePill` | GENERALIZE |
| `app/staff/page.tsx` | `getStatusPill` | GENERALIZE |
| `app/staff/page.tsx` | `ShiftDot` | GENERALIZE |
| `app/staff/page.tsx` | `PermToggle` | GENERALIZE |
| `app/staff/page.tsx` | `StaffPage` | GENERALIZE |
| `app/stores/[id]/page.tsx` | `SPINNER` | GENERALIZE |
| `app/stores/[id]/page.tsx` | `WEEK_DAYS` | GENERALIZE |
| `app/stores/[id]/page.tsx` | `STORE_COLORS` | GENERALIZE |
| `app/stores/[id]/page.tsx` | `WeekBars` | GENERALIZE |
| `app/stores/[id]/page.tsx` | `StoreDetailPage` | GENERALIZE |
| `app/stores/page.tsx` | `SPINNER` | GENERALIZE |
| `app/stores/page.tsx` | `WEEK_DAYS` | GENERALIZE |
| `app/stores/page.tsx` | `STORE_COLORS` | GENERALIZE |
| `app/stores/page.tsx` | `WeekBars` | GENERALIZE |
| `app/stores/page.tsx` | `MiniBar` | GENERALIZE |
| `app/stores/page.tsx` | `StoresPage` | GENERALIZE |
| `app/suppliers/[id]/page.tsx` | `daysAgoLabel` | GENERALIZE |
| `app/suppliers/[id]/page.tsx` | `getStatusClass` | GENERALIZE |
| `app/suppliers/[id]/page.tsx` | `Spinner` | GENERALIZE |
| `app/suppliers/[id]/page.tsx` | `SupplierDetailPage` | GENERALIZE |
| `app/suppliers/page.tsx` | `SupplierStatus` | GENERALIZE |
| `app/suppliers/page.tsx` | `STATUS_STYLE` | GENERALIZE |
| `app/suppliers/page.tsx` | `getStatusClass` | GENERALIZE |
| `app/suppliers/page.tsx` | `daysAgoLabel` | GENERALIZE |
| `app/suppliers/page.tsx` | `Spinner` | GENERALIZE |
| `app/suppliers/page.tsx` | `Toast` | GENERALIZE |
| `app/suppliers/page.tsx` | `SupplierDrawer` | GENERALIZE |
| `app/suppliers/page.tsx` | `SuppliersPage` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `SPINNER` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `StatusBig` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `MethodBadge` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `TotalRow` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `PrintIcon` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `WhatsAppIcon` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `RefundIcon` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `Toast` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `modalInputStyle` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `RefundModal` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `AttachCustomerModal` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `EmailReceiptModal` | GENERALIZE |
| `app/transactions/[id]/page.tsx` | `TransactionDetailPage` | GENERALIZE |
| `app/transactions/page.tsx` | `SPINNER` | GENERALIZE |
| `app/transactions/page.tsx` | `MethodPill` | GENERALIZE |
| `app/transactions/page.tsx` | `StatusPill` | GENERALIZE |
| `app/transactions/page.tsx` | `groupByDay` | GENERALIZE |
| `app/transactions/page.tsx` | `relativeDayLabel` | GENERALIZE |
| `app/transactions/page.tsx` | `rangeToDays` | GENERALIZE |
| `app/transactions/page.tsx` | `TransactionsPage` | GENERALIZE |
| `components/DotsMenu.tsx` | `SunIcon` | GENERALIZE |
| `components/DotsMenu.tsx` | `MoonIcon` | GENERALIZE |
| `components/DotsMenu.tsx` | `DotsIcon` | GENERALIZE |
| `components/DotsMenu.tsx` | `DotsMenuProps` | GENERALIZE |
| `components/DotsMenu.tsx` | `DotsMenu` | GENERALIZE |
| `components/LangContext.tsx` | `LangCtx` | GENERALIZE |
| `components/LangContext.tsx` | `LangContext` | GENERALIZE |
| `components/LangContext.tsx` | `LangProvider` | GENERALIZE |
| `components/LangContext.tsx` | `useLang` | GENERALIZE |
| `components/app-shell.tsx` | `Theme` | GENERALIZE |
| `components/app-shell.tsx` | `ThemeContextValue` | GENERALIZE |
| `components/app-shell.tsx` | `ThemeContext` | GENERALIZE |
| `components/app-shell.tsx` | `useTheme` | GENERALIZE |
| `components/app-shell.tsx` | `StoreContextValue` | GENERALIZE |
| `components/app-shell.tsx` | `StoreContext` | DELETE |
| `components/app-shell.tsx` | `useStore` | GENERALIZE |
| `components/app-shell.tsx` | `AppNotification` | GENERALIZE |
| `components/app-shell.tsx` | `INITIAL_NOTIFICATIONS` | DELETE |
| `components/app-shell.tsx` | `NotifContextValue` | GENERALIZE |
| `components/app-shell.tsx` | `NotifContext` | GENERALIZE |
| `components/app-shell.tsx` | `useNotifications` | GENERALIZE |
| `components/app-shell.tsx` | `AppShellProps` | GENERALIZE |
| `components/app-shell.tsx` | `AppShell` | GENERALIZE |
| `components/bottom-nav.tsx` | `ITEMS` | GENERALIZE |
| `components/bottom-nav.tsx` | `BottomNav` | GENERALIZE |
| `components/icons.tsx` | `IconProps` | GENERALIZE |
| `components/icons.tsx` | `Icon` | GENERALIZE |
| `components/icons.tsx` | `Icons` | GENERALIZE |
| `components/icons.tsx` | `IconName` | GENERALIZE |
| `components/marketing/MarketingFooter.tsx` | `MarketingFooter` | GENERALIZE |
| `components/marketing/MarketingNav.tsx` | `MarketingNav` | GENERALIZE |
| `components/review-prompt.tsx` | `Trigger` | GENERALIZE |
| `components/review-prompt.tsx` | `TRIGGERS` | GENERALIZE |
| `components/review-prompt.tsx` | `StarRating` | GENERALIZE |
| `components/review-prompt.tsx` | `ReviewPromptModalProps` | GENERALIZE |
| `components/review-prompt.tsx` | `ReviewPromptModal` | GENERALIZE |
| `components/review-prompt.tsx` | `useReviewTrigger` | DELETE |
| `components/review-prompt.tsx` | `ReviewPrompt` | GENERALIZE |
| `components/sidenav.tsx` | `SidenavProps` | GENERALIZE |
| `components/sidenav.tsx` | `STORE_PALETTE` | DELETE |
| `components/sidenav.tsx` | `colorFor` | GENERALIZE |
| `components/sidenav.tsx` | `StoreSwitcher` | GENERALIZE |
| `components/sidenav.tsx` | `NavItemProps` | GENERALIZE |
| `components/sidenav.tsx` | `NavItem` | GENERALIZE |
| `components/sidenav.tsx` | `Sidenav` | GENERALIZE |
| `components/topbar.tsx` | `Crumb` | GENERALIZE |
| `components/topbar.tsx` | `TopbarProps` | GENERALIZE |
| `components/topbar.tsx` | `HamburgerIcon` | GENERALIZE |
| `components/topbar.tsx` | `ThreeDotMenu` | GENERALIZE |
| `components/topbar.tsx` | `Topbar` | GENERALIZE |
| `lib/api.ts` | `BASE_URL` | DELETE |
| `lib/api.ts` | `ApiOk` | GENERALIZE |
| `lib/api.ts` | `ApiError` | GENERALIZE |
| `lib/api.ts` | `ApiResult` | GENERALIZE |
| `lib/api.ts` | `UserProfile` | DELETE |
| `lib/api.ts` | `Organisation` | DELETE |
| `lib/api.ts` | `SubscriptionInfo` | DELETE |
| `lib/api.ts` | `RegisterPayload` | DELETE |
| `lib/api.ts` | `LoginPayload` | DELETE |
| `lib/api.ts` | `AuthTokens` | DELETE |
| `lib/api.ts` | `RegisterResponse` | DELETE |
| `lib/api.ts` | `LoginResponse` | DELETE |
| `lib/api.ts` | `MeResponse` | DELETE |
| `lib/api.ts` | `rawFetch` | DELETE |
| `lib/api.ts` | `refreshAccessToken` | DELETE |
| `lib/api.ts` | `apiFetch` | DELETE |
| `lib/api.ts` | `getUsableAccessToken` | DELETE |
| `lib/api.ts` | `authApi` | DELETE |
| `lib/api.ts` | `organisationApi` | DELETE |
| `lib/api.ts` | `Category` | DELETE |
| `lib/api.ts` | `BulkUploadResult` | DELETE |
| `lib/api.ts` | `BulkCreateResult` | DELETE |
| `lib/api.ts` | `POSProduct` | DELETE |
| `lib/api.ts` | `InventoryProduct` | DELETE |
| `lib/api.ts` | `CompleteSalePayload` | DELETE |
| `lib/api.ts` | `CompletedTransaction` | DELETE |
| `lib/api.ts` | `inventoryApi` | DELETE |
| `lib/api.ts` | `DashboardKPIs` | DELETE |
| `lib/api.ts` | `DashboardData` | DELETE |
| `lib/api.ts` | `TransactionListItem` | DELETE |
| `lib/api.ts` | `TransactionDetail` | DELETE |
| `lib/api.ts` | `CreditCustomer` | DELETE |
| `lib/api.ts` | `CreditsDashboard` | DELETE |
| `lib/api.ts` | `CreditCustomerProfile` | DELETE |
| `lib/api.ts` | `Note` | DELETE |
| `lib/api.ts` | `StoreItem` | DELETE |
| `lib/api.ts` | `StoreDetail` | DELETE |
| `lib/api.ts` | `StoreStats` | DELETE |
| `lib/api.ts` | `AnalyticsProduct` | DELETE |
| `lib/api.ts` | `AnalyticsProductsResponse` | DELETE |
| `lib/api.ts` | `transactionApi` | DELETE |
| `lib/api.ts` | `SendReminderResult` | DELETE |
| `lib/api.ts` | `creditsApi` | DELETE |
| `lib/api.ts` | `notebookApi` | DELETE |
| `lib/api.ts` | `storesApi` | DELETE |
| `lib/api.ts` | `CustomerListItem` | DELETE |
| `lib/api.ts` | `CustomerSummary` | DELETE |
| `lib/api.ts` | `SupplierListItem` | DELETE |
| `lib/api.ts` | `SupplierStats` | DELETE |
| `lib/api.ts` | `StaffMember` | DELETE |
| `lib/api.ts` | `StaffKPIs` | DELETE |
| `lib/api.ts` | `DiscountSummary` | DELETE |
| `lib/api.ts` | `SalesAnalytics` | DELETE |
| `lib/api.ts` | `CustomerAnalytics` | DELETE |
| `lib/api.ts` | `CashflowAnalytics` | DELETE |
| `lib/api.ts` | `AnalyticsOverview` | DELETE |
| `lib/api.ts` | `customerApi` | DELETE |
| `lib/api.ts` | `supplierApi` | DELETE |
| `lib/api.ts` | `staffApi` | DELETE |
| `lib/api.ts` | `discountApi` | DELETE |
| `lib/api.ts` | `analyticsApi` | DELETE |
| `lib/api.ts` | `ReportType` | DELETE |
| `lib/api.ts` | `ScheduledReportEntry` | DELETE |
| `lib/api.ts` | `ReportExportEntry` | DELETE |
| `lib/api.ts` | `reportsApi` | DELETE |
| `lib/api.ts` | `TANZANIA_REGIONS` | DELETE |
| `lib/api.ts` | `BUSINESS_TYPES` | DELETE |
| `lib/api.ts` | `ExpenseItem` | DELETE |
| `lib/api.ts` | `ExpenseSummary` | DELETE |
| `lib/api.ts` | `AIMessage` | DELETE |
| `lib/api.ts` | `AIConversationListItem` | DELETE |
| `lib/api.ts` | `AIConversationDetail` | DELETE |
| `lib/api.ts` | `AISuggestion` | DELETE |
| `lib/api.ts` | `AICreditsStatus` | DELETE |
| `lib/api.ts` | `AIUsageEntry` | DELETE |
| `lib/api.ts` | `AIUsage` | DELETE |
| `lib/api.ts` | `aiApi` | DELETE |
| `lib/api.ts` | `expenseApi` | DELETE |
| `lib/auth.ts` | `ACCESS_KEY` | GENERALIZE |
| `lib/auth.ts` | `REFRESH_KEY` | GENERALIZE |
| `lib/auth.ts` | `USER_KEY` | GENERALIZE |
| `lib/auth.ts` | `SUB_KEY` | GENERALIZE |
| `lib/auth.ts` | `SESSION_COOKIE` | DELETE |
| `lib/auth.ts` | `setSessionCookie` | GENERALIZE |
| `lib/auth.ts` | `clearSessionCookie` | GENERALIZE |
| `lib/auth.ts` | `getAccessToken` | GENERALIZE |
| `lib/auth.ts` | `getRefreshToken` | GENERALIZE |
| `lib/auth.ts` | `saveTokens` | GENERALIZE |
| `lib/auth.ts` | `clearTokens` | GENERALIZE |
| `lib/auth.ts` | `getCachedUser` | GENERALIZE |
| `lib/auth.ts` | `cacheUser` | GENERALIZE |
| `lib/auth.ts` | `getCachedSubscription` | GENERALIZE |
| `lib/auth.ts` | `cacheSubscription` | GENERALIZE |
| `lib/auth.ts` | `isAuthenticated` | GENERALIZE |
| `lib/auth.ts` | `tokenExpiresAt` | GENERALIZE |
| `lib/auth.ts` | `tokenIsExpired` | GENERALIZE |
| `lib/data.ts` | `PRODUCTS_SIMPLE` | DELETE |
| `lib/data.ts` | `InventoryProduct` | DELETE |
| `lib/data.ts` | `INVENTORY` | DELETE |
| `lib/data.ts` | `CATEGORIES` | DELETE |
| `lib/data.ts` | `COLOR_SCHEMES` | DELETE |
| `lib/data.ts` | `POS_CATEGORIES` | DELETE |
| `lib/data.ts` | `POS_PRODUCTS` | DELETE |
| `lib/data.ts` | `TxnLine` | DELETE |
| `lib/data.ts` | `Customer` | DELETE |
| `lib/data.ts` | `Transaction` | DELETE |
| `lib/data.ts` | `P` | DELETE |
| `lib/data.ts` | `methods` | DELETE |
| `lib/data.ts` | `customers` | DELETE |
| `lib/data.ts` | `cashiers` | DELETE |
| `lib/data.ts` | `tills` | DELETE |
| `lib/data.ts` | `pick` | DELETE |
| `lib/data.ts` | `TRANSACTIONS` | DELETE |
| `lib/data.ts` | `CreditCustomer` | DELETE |
| `lib/data.ts` | `today` | DELETE |
| `lib/data.ts` | `ago` | DELETE |
| `lib/data.ts` | `CREDIT_CUSTOMERS` | DELETE |
| `lib/data.ts` | `CREDIT_TOTALS` | DELETE |
| `lib/data.ts` | `Note` | DELETE |
| `lib/data.ts` | `NOTES` | DELETE |
| `lib/data.ts` | `Store` | DELETE |
| `lib/data.ts` | `STORES` | DELETE |
| `lib/data.ts` | `AGING_BUCKETS` | DELETE |
| `lib/lang.ts` | `Lang` | GENERALIZE |
| `lib/lang.ts` | `LANG_LABELS` | GENERALIZE |
| `lib/lang.ts` | `dict` | GENERALIZE |
| `lib/lang.ts` | `TKey` | GENERALIZE |
| `lib/lang.ts` | `t` | GENERALIZE |
| `lib/reportPdf.ts` | `fmtTZS` | GENERALIZE |
| `lib/reportPdf.ts` | `fmtPct` | GENERALIZE |
| `lib/reportPdf.ts` | `fmtN` | GENERALIZE |
| `lib/reportPdf.ts` | `cap` | GENERALIZE |
| `lib/reportPdf.ts` | `THEME` | GENERALIZE |
| `lib/reportPdf.ts` | `BarPoint` | GENERALIZE |
| `lib/reportPdf.ts` | `svgBarChart` | GENERALIZE |
| `lib/reportPdf.ts` | `hBar` | GENERALIZE |
| `lib/reportPdf.ts` | `kpiCard` | GENERALIZE |
| `lib/reportPdf.ts` | `ColDef` | GENERALIZE |
| `lib/reportPdf.ts` | `buildTable` | GENERALIZE |
| `lib/reportPdf.ts` | `baseCSS` | GENERALIZE |
| `lib/reportPdf.ts` | `reportHeader` | GENERALIZE |
| `lib/reportPdf.ts` | `reportFooter` | GENERALIZE |
| `lib/reportPdf.ts` | `ReportMeta` | GENERALIZE |
| `lib/reportPdf.ts` | `buildSalesHTML` | GENERALIZE |
| `lib/reportPdf.ts` | `buildInventoryHTML` | GENERALIZE |
| `lib/reportPdf.ts` | `buildTaxHTML` | GENERALIZE |
| `lib/reportPdf.ts` | `buildCreditHTML` | GENERALIZE |
| `lib/reportPdf.ts` | `openReportPrintWindow` | GENERALIZE |
| `lib/reportPdf.ts` | `ReceiptData` | GENERALIZE |
| `lib/reportPdf.ts` | `openReceiptPrintWindow` | GENERALIZE |
| `lib/reportPdf.ts` | `escapeHtml` | GENERALIZE |
| `lib/utils.ts` | `fmt` | GENERALIZE |
| `lib/utils.ts` | `fmtShort` | GENERALIZE |
| `lib/utils.ts` | `fmtTime` | GENERALIZE |
| `lib/utils.ts` | `fmtDate` | GENERALIZE |
| `lib/utils.ts` | `fmtDT` | GENERALIZE |
| `lib/utils.ts` | `localDateStr` | GENERALIZE |
| `lib/utils.ts` | `seeded` | GENERALIZE |
| `next.config.ts` | `nextConfig` | DELETE |
| `proxy.ts` | `SESSION_COOKIE` | DELETE |
| `proxy.ts` | `PROTECTED_PREFIXES` | DELETE |
| `proxy.ts` | `AUTH_ROUTES` | DELETE |
| `proxy.ts` | `proxy` | DELETE |
| `proxy.ts` | `config` | DELETE |
| `public/sw.js` | `CACHE` | DELETE |
| `public/sw.js` | `PRECACHE` | DELETE |
