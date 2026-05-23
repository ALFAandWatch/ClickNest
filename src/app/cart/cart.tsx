'use client';

import CartItem from '@/components/CartItem/CartItem';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { createOrder } from '../lib/orders';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const CartPage = () => {
   const { cart, setCart, removeFromCart } = useCart();
   const { user } = useAuth();
   const [totalPrice, setTotalPrice] = useState(0);
   const router = useRouter();

   useEffect(() => {
      const total = cart.reduce(
         (sum, product) => sum + product.price * product.quantity,
         0
      );
      setTotalPrice(total);
   }, [cart]);

   const handlePurchaseConfirmation = async () => {
      if (!user) return;
      const productsToAddToOrder = cart.map((product) => product.id);

      await createOrder(productsToAddToOrder).then(() => {
         Swal.fire({
            icon: 'success',
            title: 'Compra realizada!',
            text: 'Se ha odido realizar la compra con éxito. Podrás ver la compra en tu dashboard, en la parte de Mis Compras.',
            confirmButtonText: 'OK',
         }).then((result) => {
            setCart([]);
            if (result.isConfirmed) {
               router.push('/dashboard');
            }
         });
      });
   };

   return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
         <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>

         <div className="w-full max-w-2xl">
            {cart.length > 0 ? (
               cart.map((product) => {
                  return (
                     <CartItem
                        key={product.id}
                        {...product}
                        quantity={product.quantity}
                        onRemove={removeFromCart}
                     />
                  );
               })
            ) : (
               <p className="text-gray-500 text-center">
                  Tu carrito está vacío.
               </p>
            )}
         </div>
         {totalPrice > 0 ? (
            <>
               <hr className="border" />
               <h2 className="text-2xl pt-4">Total: ${totalPrice}</h2>
            </>
         ) : null}

         {cart.length > 0 && (
            <button
               onClick={handlePurchaseConfirmation}
               className="mt-6 bg-turquoise text-black py-3 px-6 rounded-lg font-semibold text-lg"
            >
               Finalizar Compra
            </button>
         )}
      </div>
   );
};

export default CartPage;
