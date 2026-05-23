import { Product } from './Product';

export type OrderType = {
   id: number;
   status: string;
   date: Date;
   products: Product[];
};

type ProductFromDB = {
   id: number;
   name: string;
   price: number;
   image: string;
};

type OrderItemFromDB = {
   product_id: number;
   products: ProductFromDB[];
};

export type OrderFromDB = {
   id: number;
   status: string;
   date: string;
   order_items: OrderItemFromDB[];
};
