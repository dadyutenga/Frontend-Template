import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { pageRoutes } from './routes';
import { DashboardLayout, AuthLayout } from '@/components/layout/Layouts';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { PageLoader, RouteError } from '@/components/shared/feedback';
function routesFor(layout:'auth'|'dashboard'){return pageRoutes.filter(route=>(route.layout??'dashboard')===layout).map(route=>{const Page=lazy(route.load);const page=<Suspense fallback={<PageLoader/>}><Page/></Suspense>;return {path:route.path,element:route.protected?<ProtectedRoute roles={route.roles}>{page}</ProtectedRoute>:page}})}
export const router=createBrowserRouter([{element:<DashboardLayout/>,errorElement:<RouteError/>,children:routesFor('dashboard')},{element:<AuthLayout/>,errorElement:<RouteError/>,children:routesFor('auth')}]);
