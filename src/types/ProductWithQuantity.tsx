import { ProductCardType } from './ProductCardType';

export type ProductWithQuantity = ProductCardType & {
   quantity: number;
};
