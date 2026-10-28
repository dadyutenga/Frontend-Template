import type { ComponentType } from 'react';
import {
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  UserRound,
  Settings,
  Shapes,
  FilePlus2,
  ShieldCheck,
} from 'lucide-react';
import type { Role } from '@/types';
interface PageModule {
  default: ComponentType;
}
export interface PageRoute {
  path: string;
  label: string;
  icon?: typeof LayoutDashboard;
  load: () => Promise<PageModule>;
  nav?: boolean;
  protected?: boolean;
  roles?: Role[];
  layout?: 'auth' | 'dashboard';
}
// Add one entry here: the router, sidebar, breadcrumbs and command search all use it.
export const pageRoutes: PageRoute[] = [
  {
    path: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
    load: () => import('@/features/dashboard/Dashboard'),
    nav: true,
  },
  {
    path: '/records',
    label: 'Records',
    icon: FolderOpen,
    load: () => import('@/features/example-crud/ListPage'),
    nav: true,
  },
  {
    path: '/records/new',
    label: 'Create record',
    load: () => import('@/features/example-crud/CreatePage'),
    protected: true,
  },
  {
    path: '/records/:id',
    label: 'Record details',
    load: () => import('@/features/example-crud/DetailPage'),
  },
  {
    path: '/reports',
    label: 'Reports',
    icon: BarChart3,
    load: () => import('@/features/reports/Reports'),
    nav: true,
  },
  {
    path: '/components',
    label: 'Components',
    icon: Shapes,
    load: () => import('@/pages/ComponentGallery'),
    nav: true,
  },
  {
    path: '/example',
    label: 'Example Page',
    icon: FilePlus2,
    load: () => import('@/pages/ExamplePage'),
    nav: true,
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: UserRound,
    load: () => import('@/features/settings/Profile'),
    nav: true,
    protected: true,
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: Settings,
    load: () => import('@/features/settings/Settings'),
    nav: true,
  },
  {
    path: '/admin',
    label: 'Admin example',
    icon: ShieldCheck,
    load: () => import('@/pages/ExamplePage'),
    protected: true,
    roles: ['admin'],
  },
  {
    path: '/auth/login',
    label: 'Sign in',
    load: () => import('@/features/auth/Login'),
    layout: 'auth',
  },
  {
    path: '/auth/register',
    label: 'Create account',
    load: () => import('@/features/auth/Register'),
    layout: 'auth',
  },
  {
    path: '/auth/forgot-password',
    label: 'Forgot password',
    load: () => import('@/features/auth/ForgotPassword'),
    layout: 'auth',
  },
  {
    path: '/auth/reset-password',
    label: 'Reset password',
    load: () => import('@/features/auth/ResetPassword'),
    layout: 'auth',
  },
  { path: '/403', label: 'Access denied', load: () => import('@/pages/Forbidden') },
  { path: '/500', label: 'Server error', load: () => import('@/pages/ServerError') },
  { path: '*', label: 'Page not found', load: () => import('@/pages/NotFound') },
];
