'use client';
import {
   createContext,
   useContext,
   useState,
   useEffect,
   ReactNode,
} from 'react';
import { CartContextType } from '@/types/CartContextType';
import { ProductWithQuantity } from '@/types/ProductWithQuantity';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
   const [cart, setCart] = useState<ProductWithQuantity[]>([]);

   useEffect(() => {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
         setCart(JSON.parse(storedCart));
      }
   }, []);

   useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
   }, [cart]);

   const addToCart = (item: ProductWithQuantity) => {
      setCart((prevCart) => {
         const existingItem = prevCart.find((i) => i.id === item.id);
         if (existingItem) {
            return prevCart.map((i) =>
               i.id === item.id
                  ? {
                       ...i,
                       quantity: existingItem.quantity + item.quantity,
                       image: i.image?.trim() || '/no-image.webp',
                    }
                  : i
            );
         }
         const normalizedItem: ProductWithQuantity = {
            ...item,
            image: item.image?.trim() || '/no-image.webp',
         };

         return [...prevCart, normalizedItem];
      });
   };

   const removeFromCart = (id: number) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
   };

   return (
      <CartContext.Provider
         value={{ cart, addToCart, setCart, removeFromCart }}
      >
         {children}
      </CartContext.Provider>
   );
}

export function useCart() {
   const context = useContext(CartContext);
   if (!context) {
      throw new Error('useCart must be used within a CartProvider');
   }
   return context;
}
