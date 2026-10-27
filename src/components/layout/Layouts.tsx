import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, matchPath } from 'react-router-dom';
import { Blocks, Menu, PanelLeftClose, PanelLeftOpen, ArrowUpRight } from 'lucide-react';
import { pageRoutes } from '@/app/routes';
import { useLocalStorage } from '@/hooks';
import { Drawer, IconButton, Badge } from '@/components/ui';
import { Breadcrumb } from '@/components/shared/patterns';
import {
  CommandPalette,
  NotificationBell,
  ThemeToggle,
  UserMenu,
} from '@/components/shared/app-controls';
import { ErrorBoundary } from '@/components/shared/feedback';
function Navigation({
  collapsed = false,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Main navigation" className="space-y-1">
      {pageRoutes
        .filter((r) => r.nav)
        .map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            end={route.path === '/'}
            onClick={onNavigate}
            title={collapsed ? route.label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-background hover:text-foreground'}`
            }
          >
            {route.icon && <route.icon size={18} className="shrink-0" />}
            <span className={collapsed ? 'sr-only' : ''}>{route.label}</span>
          </NavLink>
        ))}
    </nav>
  );
}
function Brand({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 font-bold text-lg">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-surface">
        <Blocks size={20} />
      </span>
      {!collapsed && 'Your App'}
    </Link>
  );
}
export function DashboardLayout() {
  const [collapsed, setCollapsed] = useLocalStorage('template-sidebar', false);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();
  const route = pageRoutes.find((r) => r.path !== '*' && matchPath(r.path, location.pathname));
  return (
    <div className="min-h-dvh">
      <a
        href="#main-content"
        className="sr-only z-80 rounded bg-surface p-3 focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-line bg-surface p-5 md:flex ${collapsed ? 'w-22' : 'w-64'}`}
      >
        <Brand collapsed={collapsed} />
        <div className="mt-10 mb-3 px-3 text-[10px] font-semibold tracking-[.16em] text-muted">
          {collapsed ? '•••' : 'WORKSPACE'}
        </div>
        <Navigation collapsed={collapsed} />
        <div className="mt-auto pt-8">
          {!collapsed && (
            <div className="mb-5 rounded-xl bg-background p-4">
              <Badge>STARTER TEMPLATE</Badge>
              <h3 className="mt-3">Make it your own</h3>
              <p className="muted my-2 text-xs">
                Reusable patterns. A foundation for your next idea.
              </p>
              <Link
                to="/example"
                className="inline-flex items-center gap-2 text-xs font-semibold text-accent"
              >
                Explore the guide <ArrowUpRight size={13} />
              </Link>
            </div>
          )}
          <IconButton
            label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
          </IconButton>
        </div>
      </aside>
      <Drawer
        open={mobile}
        onClose={() => setMobile(false)}
        title="Your App"
        description="Workspace navigation"
      >
        <Navigation onNavigate={() => setMobile(false)} />
      </Drawer>
      <div className={collapsed ? 'md:ml-22' : 'md:ml-64'}>
        <header className="flex h-20 items-center gap-3 border-b border-line bg-surface px-4 sm:px-8">
          <IconButton label="Open navigation" className="md:hidden" onClick={() => setMobile(true)}>
            <Menu size={18} />
          </IconButton>
          <CommandPalette />
          <ThemeToggle />
          <NotificationBell />
          <div className="mx-1 h-7 border-l border-line" />
          <UserMenu />
        </header>
        <div className="flex items-center justify-between gap-4 px-5 pt-6 sm:px-8">
          <Breadcrumb
            items={[{ label: 'Workspace', href: '/' }, { label: route?.label ?? 'Page not found' }]}
          />
          <span className="hidden text-xs text-muted sm:block">
            Frontend template <span className="ml-2 text-success">● All systems local</span>
          </span>
        </div>
        <main id="main-content" className="mx-auto max-w-[1600px] p-5 sm:p-8" tabIndex={-1}>
          <ErrorBoundary key={location.pathname}>
            <Outlet />
          </ErrorBoundary>
        </main>
        <footer className="mx-5 flex flex-wrap justify-between gap-3 border-t border-line py-5 text-xs text-muted sm:mx-8">
          <span>© {new Date().getFullYear()} Your App · Built to be yours.</span>
          <span>
            React + Vite + TypeScript{' '}
            <Link to="/example" className="ml-4 text-accent">
              Getting started
            </Link>
          </span>
        </footer>
      </div>
    </div>
  );
}
export function AuthLayout() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="hidden flex-col justify-between bg-accent p-14 text-surface lg:flex">
        <Brand />
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest opacity-70">
            A place for your next idea
          </span>
          <h2 className="mt-6 max-w-lg text-5xl leading-tight">
            A strong foundation.
            <br />
            Endless possibilities.
          </h2>
          <p className="mt-6 max-w-md opacity-80">
            Thoughtful components, flexible layouts, and the tools to build something that’s yours.
          </p>
        </div>
        <p className="text-xs opacity-70">
          UI demonstration only. No authentication service is connected.
        </p>
      </aside>
      <main className="flex flex-col p-6 sm:p-12">
        <div className="flex justify-between">
          <Link to="/" className="text-sm text-muted">
            ← Back to workspace
          </Link>
          <ThemeToggle />
        </div>
        <div className="mx-auto my-auto w-full max-w-sm py-14">
          <Outlet />
        </div>
        <p className="muted text-center text-xs">Demo forms · Never enter a real password</p>
      </main>
    </div>
  );
}
