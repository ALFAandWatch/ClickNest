import { supabase } from './supabaseClient';

export async function getProducts() {
   try {
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
         throw new Error(error.message);
      }

      return data || [];
   } catch (error) {
      console.error(error);
      return [];
   }
}
