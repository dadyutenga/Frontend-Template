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
