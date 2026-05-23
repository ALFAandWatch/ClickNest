import { Product } from '@/types/Product';

type propsType = {
   image: string;
   name: string;
   price: number;
};

const ProductInsideOrder = (props: propsType) => {
   const { image, name, price } = props;
   return (
      <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg shadow-sm">
         <img
            src={image}
            alt={name}
            className="w-16 h-16 object-cover rounded-lg"
         />
         <div className="flex-1">
            <p className="text-gray-800 font-medium">{name}</p>
            <p className="text-gray-600 font-semibold">${price.toFixed(2)}</p>
         </div>
      </div>
   );
};

export default ProductInsideOrder;
