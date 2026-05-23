import Link from 'next/link';

interface CartItemProps {
   id: number;
   name: string;
   image: string;
   price: number;
   quantity: number;
   onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
   id,
   name,
   image,
   price,
   quantity,
   onRemove,
}) => {
   return (
      <div className="border rounded-lg shadow-md p-4 flex items-center gap-4 bg-white w-full">
         {/* Product Image */}
         <Link href={`/product/${id}`} className="w-20 h-20">
            <img
               src={image}
               alt={name}
               className="rounded-lg object-cover w-full h-full"
               onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;

                  if (img.dataset.fallback) return;

                  img.dataset.fallback = 'true';
                  img.src = '/no-image.webp';
               }}
            />
         </Link>

         {/* Product Info */}
         <div className="flex-1">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-gray-500">Precio: ${price}</p>
            <p className="text-gray-700">Cantidad: {quantity}</p>
         </div>

         {/* Remove Button */}
         <button
            onClick={() => onRemove(id)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
         >
            Eliminar
         </button>
      </div>
   );
};

export default CartItem;
