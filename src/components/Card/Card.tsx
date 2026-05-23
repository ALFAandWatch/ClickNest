import Link from 'next/link';
import { FC } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Swal from 'sweetalert2';
import { ProductWithQuantity } from '@/types/ProductWithQuantity';
import { ProductCardType } from '@/types/ProductCardType';

const Card: FC<ProductWithQuantity> = (props: ProductCardType) => {
   const { id, name, description, image, price } = props;

   const { isAuthenticated } = useAuth();
   const { addToCart } = useCart();

   const handleAddToCart = () => {
      isAuthenticated
         ? Swal.fire({
              imageUrl: image,
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
                 addToCart({ ...props, quantity: parseInt(result.value) });
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
      <>
         {
            <div className="border rounded-lg shadow-lg p-4 m-3 w-[18rem] h-[24rem]">
               <Link href={`/product/${id}`}>
                  <img
                     src={image}
                     alt={`${name}`}
                     className="w-full h-48 rounded-lg object-contain m-2"
                  />
               </Link>
               <h2>{name}</h2>
               <h3 className="text-lg font-semibold mt-2">
                  Producto Destacado
               </h3>
               <p className="text-gray-500">${price}</p>
               <button
                  className="mt-4 w-full bg-turquoise text-black py-2 rounded-lg font-semibold hover:brightness-150 transition duration-500 ease-in-out"
                  onClick={handleAddToCart}
               >
                  Agregar al Carrito
               </button>
            </div>
         }
      </>
   );
};

export default Card;
