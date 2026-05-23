import Link from 'next/link';
import categoriesHelper from '@/helpers/categories';
import { Category } from '@/types/CategoryType';

const categories = categoriesHelper;

const CategoriesPage = () => {
   return (
      <div className="min-h-screen bg-gray-100 p-8">
         <h1 className="text-3xl font-bold text-center mb-8">All Categories</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: Category, index) => (
               <Link key={category.name} href={`/products/${index + 1}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4 hover:brightness-110 transition duration-300 cursor-pointer">
                     <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <img
                           src={category.image}
                           alt={category.name}
                           className="w-full h-full object-contain"
                        />
                     </div>
                     <p className="text-lg font-semibold">{category.name}</p>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
};

export default CategoriesPage;
