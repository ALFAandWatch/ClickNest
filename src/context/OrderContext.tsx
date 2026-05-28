'use client';

import { OrderType } from '@/types/OrderType';
import { createContext, useContext, useState } from 'react';

type OrderContextType = {
   orders: OrderType[];
   setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
   const [orders, setOrders] = useState<OrderType[]>([]);

   return (
      <OrderContext.Provider value={{ orders, setOrders }}>
         {children}
      </OrderContext.Provider>
   );
}

export const useOrders = () => {
   const context = useContext(OrderContext);

   if (!context) {
      throw new Error('useOrders must be used within an OrderProvider');
   }

   return context;
};
