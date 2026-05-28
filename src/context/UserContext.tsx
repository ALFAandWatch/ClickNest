'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useAuth } from './AuthContext';

type UserContextType = {
   profile: Profile | null;
   loading: boolean;
   refreshProfile: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
   const { user, loading: authLoading } = useAuth();

   const [profile, setProfile] = useState<Profile | null>(null);
   const [loading, setLoading] = useState(true);

   // 🔥 fetch centralizado
   const fetchProfile = async (userId: string) => {
      const { data, error } = await supabase
         .from('users')
         .select('*')
         .eq('id', userId)
         .single();

      if (error) {
         console.error('Error fetching profile:', error);
         return null;
      }

      return data;
   };

   const refreshProfile = async () => {
      if (!user) return;

      const data = await fetchProfile(user.id);
      setProfile(data);
   };

   useEffect(() => {
      // ⛔ esperar a que Auth termine
      if (authLoading) return;

      // 🚪 NO hay sesión → limpiar todo
      if (!user) {
         setProfile(null);
         setLoading(false);
         return;
      }

      // ✅ hay sesión → cargar profile
      const load = async () => {
         setLoading(true);

         const data = await fetchProfile(user.id);
         setProfile(data);

         setLoading(false);
      };

      load();
   }, [user, authLoading]);

   return (
      <UserContext.Provider
         value={{
            profile,
            loading,
            refreshProfile,
         }}
      >
         {children}
      </UserContext.Provider>
   );
}

export const useUser = () => {
   const context = useContext(UserContext);

   if (!context) {
      throw new Error('useUser must be used within UserProvider');
   }

   return context;
};
