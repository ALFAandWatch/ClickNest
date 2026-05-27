'use client';

import {
   createContext,
   useContext,
   useState,
   ReactNode,
   useEffect,
} from 'react';
import { AuthContextType } from '../types/AuthContextType';
import { AuthenticatedUser } from '@/types/User';
import { OrderType } from '@/types/OrderType';
import { supabase } from '@/app/lib/supabaseClient';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
   const [user, setUser] = useState<AuthenticatedUser | null>(null);
   const [orders, setOrders] = useState<OrderType[]>([]);

   // 🔥 Cargar sesión inicial
   useEffect(() => {
      const init = async () => {
         setUser(null);
         setOrders([]);

         const { data } = await supabase.auth.getSession();

         if (!data.session?.user) return;

         const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.session.user.id)
            .single();

         setUser(profile);
      };

      init();
   }, []);

   // 🔥 Escuchar cambios de login/logout
   useEffect(() => {
      const { data: listener } = supabase.auth.onAuthStateChange(
         async (_event, session) => {
            if (session) {
               const { data: profile } = await supabase
                  .from('users')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();

               setUser(profile);
            } else {
               setUser(null);
               setOrders([]);
            }
         }
      );

      return () => {
         listener.subscription.unsubscribe();
      };
   }, []);

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated: !!user,
            user,
            setUser,
            orders,
            setOrders,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
}
