import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { Role } from '@/types';
import { useAuth } from './AuthProvider';
export function ProtectedRoute({ roles, children }: { roles?: Role[]; children?: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user)
    return <Navigate to={`/auth/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/403" replace />;
  return children ?? <Outlet />;
}
