import { Product } from './Product';

export type OrderType = {
   id: number;
   status: string;
   date: Date;
   products: Product[];
};
