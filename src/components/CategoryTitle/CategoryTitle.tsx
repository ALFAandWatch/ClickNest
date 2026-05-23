import { FC } from 'react';

type CategoryTitleProps = {
   chosenCategory: number | undefined;
};

const CategoryTitle: FC<CategoryTitleProps> = (props) => {
   const { chosenCategory } = props;

   let title = '';

   switch (chosenCategory) {
      case 1:
         title = 'Smartphones';
         break;
      case 2:
         title = 'Laptops';
         break;
      case 3:
         title = 'Tablets';
         break;
      case 4:
         title = 'Auriculares';
         break;
      case 5:
         title = 'Cámaras';
         break;
      case 6:
         title = 'Impresoras';
         break;
      default:
         title = '';
   }

   return (
      <>
         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 mt-4">
            {title}
         </h2>
      </>
   );
};

export default CategoryTitle;
