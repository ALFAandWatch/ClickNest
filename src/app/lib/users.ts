import { LoginObject } from '@/types/LoginObject';
import { User } from '@/types/User';
import Swal from 'sweetalert2';
import { supabase } from './supabaseClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(values: User) {
   try {
      const { email, password } = values;

      console.log('VALUES:', values);

      const { data, error } = await supabase.auth.signUp({
         email,
         password,
         options: {
            data: {
               name: values.name,
               email: email,
               address: values.address,
               phone: values.phone,
            },
         },
      });

      if (error) {
         console.error('SUPABASE ERROR:', error);
         throw new Error(error.message);
      }

      return data;
   } catch (error) {
      Swal.fire({
         icon: 'error',
         text: 'Error al registrar al usuario.',
         confirmButtonText: 'OK',
      });
      throw error;
   }
}

export async function loginUser(values: LoginObject) {
   try {
      const { email, password } = values;

      const { data, error } = await supabase.auth.signInWithPassword({
         email,
         password,
      });

      if (error) throw error;

      const userId = data.user.id;

      const { data: profile, error: profileError } = await supabase
         .from('users')
         .select('*')
         .eq('id', userId)
         .single();

      if (profileError) throw profileError;

      return {
         session: data.session,
         user: profile,
      };
   } catch (error: any) {
      Swal.fire({
         icon: 'error',
         title: error?.message || 'Error al intentar ingresar.',
      });

      return null;
   }
}

export async function logOutUser() {
   await supabase.auth.signOut();
   localStorage.removeItem('cart');
}
