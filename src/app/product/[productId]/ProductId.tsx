'use client';

import { useParams } from 'next/navigation';
import productosHelper from '../../../helpers/productos';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Swal from 'sweetalert2';
import { getProducts } from '@/app/lib/products';

const ProductDetails = () => {
   const params = useParams();
   const [product, setProduct] = useState({
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      image: '',
      categoryId: 0,
   });

   const { id, name, description, image, price } = product;

   const [loading, setLoading] = useState(true);

   const { isAuthenticated } = useAuth();
   const { addToCart } = useCart();

   useEffect(() => {
      const load = async () => {
         const all = await getProducts();
         const found = all.find((p) => p.id === Number(params.productId));

         if (found) setProduct(found);
         setLoading(false);
      };

      load();
   }, [params.productId]);

   // useEffect(() => {
   //    console.log(product);
   // }, [product]);

   if (loading) return <p>Loading product...</p>;
   if (!product) return <p>Product not found.</p>;

   const handleAddToCart = () => {
      isAuthenticated
         ? Swal.fire({
              imageUrl: product.image,
              imageWidth: '50%',
              title: '¿Agregar al carrito?',
              inputLabel: '¿Cuántos?',
              input: 'number',
              inputValue: '1',
              reverseButtons: true,
              confirmButtonColor: '#39c9bb',
              confirmButtonText: 'Agregar',
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
           }).then((result) => {
              if (result.isConfirmed) {
                 addToCart({
                    id,
                    name,
                    description,
                    image,
                    price,
                    quantity: parseInt(result.value),
                 });
              }
           })
         : Swal.fire({
              icon: 'info',
              text: 'Debes ingresar para poder agregar productos al carrito.',
              confirmButtonColor: '#39c9bb',
              confirmButtonText: 'OK',
           });
   };

   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
         <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2">
               <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto rounded-lg object-contain"
                  onError={(e) => {
                     const img = e.currentTarget as HTMLImageElement;

                     // evita loop infinito
                     if (img.dataset.fallback) return;

                     img.dataset.fallback = 'true';
                     img.src = '/no-image.webp'; // mejor opción local
                  }}
               />
            </div>

            <div className="w-full md:w-1/2">
               <h2 className="text-3xl font-bold text-gray-900">
                  {product.name}
               </h2>
               <p className="text-gray-600 mt-3">{product.description}</p>
               <p className="text-gray-900 font-semibold text-2xl mt-4">
                  ${product.price}
               </p>

               <button
                  className="mt-6 w-full bg-turquoise text-black py-3 rounded-lg font-semibold text-lg"
                  onClick={handleAddToCart}
               >
                  Agregar al Carrito
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProductDetails;
