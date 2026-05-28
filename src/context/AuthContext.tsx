'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

type AuthContextType = {
   user: User | null;
   isAuthenticated: boolean;
   loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const getInitialSession = async () => {
         const { data } = await supabase.auth.getSession();

         if (data.session?.user) {
            setUser(data.session.user);
         }

         setLoading(false);
      };

      getInitialSession();

      const { data: listener } = supabase.auth.onAuthStateChange(
         (_event, session) => {
            setUser(session?.user ?? null);
         }
      );

      return () => {
         listener.subscription.unsubscribe();
      };
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user,
            isAuthenticated: !!user,
            loading,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export const useAuth = () => {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }

   return context;
};
