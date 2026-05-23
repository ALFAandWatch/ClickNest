'use client';

import { FC, useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import { getProducts } from './lib/products';
import { Product } from '@/types/Product';

const Home: FC = () => {
   const [products, setProducts] = useState<any[]>([]);

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

   return (
      <>
         <div>
            <section className="relative w-full h-[560px] bg-[url('https://bigbrandwatches.com/wp-content/uploads/2019/03/RolexBannerWeb.jpg')] bg-cover bg-center flex items-center justify-center text-white mb-[100px]">
               <div className="text-center bg-black bg-opacity-50 p-6 rounded-lg">
                  <h1 className="text-4xl font-bold">
                     Descubre lo mejor en moda y accesorios.
                  </h1>
                  <p className="mt-2 text-lg">
                     Ofertas exclusivas por tiempo limitado.
                  </p>
                  <button className="mt-4 bg-turquoise text-black px-6 py-3 rounded-lg font-semibold hover:brightness-150">
                     Comprar Ahora
                  </button>
               </div>
            </section>
            <section className="">
               <div className="flex flex-col align-middle mb-[50px]">
                  <h2 className="text-4xl font-bold text-center mb-3">
                     Calidad y confianza
                  </h2>
                  <p className="mt-2 text-lg text-center w-[50%] mx-auto">
                     La mejor tecnología, al mejor precio. Encuentra
                     smartphones, laptops, accesorios y más con garantía y
                     envíos rápidos.
                  </p>
               </div>
               <div className="flex flex-row flex-wrap justify-center w-[80%] mx-auto mb-[100px]">
                  {products.map((product: Product) => {
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
            </section>
         </div>
      </>
   );
};

export default Home;
