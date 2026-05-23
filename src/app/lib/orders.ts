import { OrderType } from '@/types/OrderType';
import { supabase } from './supabaseClient';

export async function createOrder(products: number[]) {
   try {
      // 1. Usuario actual
      const { data: userData, error: userError } =
         await supabase.auth.getUser();

      if (userError || !userData.user) {
         throw new Error('User not authenticated');
      }

      const user = userData.user;

      // 2. Crear orden
      const { data: order, error: orderError } = await supabase
         .from('orders')
         .insert([
            {
               user_id: user.id,
               status: 'pending',
               date: new Date().toISOString(),
            },
         ])
         .select()
         .single();

      if (orderError) throw orderError;

      // 3. Preparar relación productos
      const orderProducts = products.map((productId) => ({
         order_id: order.id,
         product_id: productId,
      }));

      // 4. Insertar en tabla intermedia
      const { error: productsError } = await supabase
         .from('order_items')
         .insert(orderProducts);

      if (productsError) throw productsError;

      return order;
   } catch (error) {
      console.error('Order creation failed:', error);
      throw error;
   }
}

export async function getOrders(): Promise<OrderType[]> {
   try {
      const { data: userData, error: userError } =
         await supabase.auth.getUser();

      if (userError || !userData.user) {
         throw new Error('User not authenticated');
      }

      const user = userData.user;

      const { data, error } = await supabase
         .from('orders')
         .select(
            `
            id,
            status,
            date,
            order_items (
               product_id,
               products (
                  id,
                  name,
                  price,
                  image
               )
            )
         `
         )
         .eq('user_id', user.id);

      if (error) throw error;

      // 🔥 NORMALIZACIÓN
      return (data ?? []).map((order: any) => ({
         id: order.id,
         status: order.status,
         date: order.date,
         products: order.order_items.map((op: any) => op.products),
      }));
   } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
   }
}
