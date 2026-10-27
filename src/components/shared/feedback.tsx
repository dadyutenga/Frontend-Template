import { Component, type ReactNode } from 'react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Button, Spinner } from '@/components/ui';
export class ErrorBoundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}componentDidCatch(){/* Connect your error reporting service here. */}render(){return this.state.failed?<ErrorPage code="500" title="Something went wrong" description="Please reload the page and try again."/>:this.props.children}}
export function PageLoader(){return <div className="grid min-h-64 place-items-center"><Spinner/></div>}
export function ErrorPage({code,title,description}:{code:string;title:string;description:string}){return <div className="grid min-h-[70dvh] place-items-center p-8"><section className="max-w-lg text-center"><p className="mb-4 text-7xl font-bold text-accent">{code}</p><h1>{title}</h1><p className="muted my-5">{description}</p><Link className="btn btn-primary" to="/">Back to dashboard</Link><Button className="ml-3" onClick={()=>window.location.reload()}>Reload page</Button></section></div>}
export function NotFound(){return <ErrorPage code="404" title="Page not found" description="The page may have moved, or the address may be incorrect."/>}
export function RouteError(){const error=useRouteError();return <ErrorPage code={isRouteErrorResponse(error)?String(error.status):'500'} title="Unable to load this page" description="Try reloading, or return to the dashboard."/>}
