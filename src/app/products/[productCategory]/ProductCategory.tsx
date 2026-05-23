'use client';

import { getProducts } from '@/app/lib/products';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/types/Product';
import Card from '@/components/Card/Card';
import CategoryTitle from '@/components/CategoryTitle/CategoryTitle';

const ProductCategory = () => {
   const params = useParams();
   const [products, setProducts] = useState<Product[]>([]);
   const [chosenCategory, setchosenCategory] = useState<number | null>(null);
   const router = useRouter();

   useEffect(() => {
      if (params.productCategory) {
         setchosenCategory(Number(params.productCategory));
      }
   }, [params.productCategory]);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const allProducts = await getProducts();
            setProducts(allProducts);
         } catch (error) {
            console.log(error);
         }
      };
      fetchProducts();
   }, []);

   // useEffect(() => {
   //    console.log('PRODUCTOS: ', products);
   // }, [products]);

   const categoryId = Number(params.productCategory);

   categoryId > 6 && router.push('/desconocido');

   const filteredProduct = categoryId
      ? products.filter((product) => product.category_id === categoryId)
      : [];

   return (
      <>
         <div>
            {<CategoryTitle chosenCategory={categoryId} />}
            <div className="flex flex-row flex-wrap justify-center w-[80%] mx-auto mb-[100px]">
               {filteredProduct.map((product: Product) => {
                  const { id, name, description, image, price } = product;
                  const quantity = 0;
                  return (
                     <Card
                        key={id}
                        id={id}
                        name={name}
                        description={description}
                        image={image}
                        quantity={quantity}
                        price={price}
                     />
                  );
               })}
            </div>
         </div>
      </>
   );
};
export default ProductCategory;
