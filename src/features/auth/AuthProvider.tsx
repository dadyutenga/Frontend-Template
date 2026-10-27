import { createContext, useContext, useState, type ReactNode } from 'react';
import type { DemoUser } from '@/types';
import { tokenStorage } from '@/lib/token-storage';
interface AuthContextValue {user:DemoUser|null;login:(email:string,name?:string)=>void;logout:()=>void}
const AuthContext=createContext<AuthContextValue|undefined>(undefined);
export function AuthProvider({children}:{children:ReactNode}) {const [user,setUser]=useState<DemoUser|null>(null);return <AuthContext.Provider value={{user,login:(email,name='Alex Morgan')=>{setUser({name,email,role:'member'});tokenStorage.set('demo-only-not-a-real-token')},logout:()=>{setUser(null);tokenStorage.clear()}}}>{children}</AuthContext.Provider>}
export function useAuth(){const context=useContext(AuthContext);if(!context)throw new Error('AuthProvider is required');return context;}
