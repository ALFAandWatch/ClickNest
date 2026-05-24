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
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [user, setUser] = useState<AuthenticatedUser | null>(null);
   const [orders, setOrders] = useState<OrderType[]>([]);

   // 🔥 Cargar sesión inicial
   useEffect(() => {
      const init = async () => {
         setIsAuthenticated(false);
         setUser(null);
         setOrders([]);

         const { data } = await supabase.auth.getSession();

         if (data.session) {
            setIsAuthenticated(true);

            // traer perfil real
            const { data: profile } = await supabase
               .from('users')
               .select('*')
               .eq('id', data.session.user.id)
               .single();

            setUser(profile);
         } else {
            setIsAuthenticated(false);
            setUser(null);
            setOrders([]);
         }
      };

      init();
   }, []);

   // 🔥 Escuchar cambios de login/logout
   useEffect(() => {
      const { data: listener } = supabase.auth.onAuthStateChange(
         async (_event, session) => {
            if (session) {
               setIsAuthenticated(true);

               const { data: profile } = await supabase
                  .from('users')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();

               setUser(profile);
            } else {
               setIsAuthenticated(false);
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
            isAuthenticated,
            setIsAuthenticated,
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
