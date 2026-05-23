import { FC } from 'react';

const LandingPage: FC = () => {
   return (
      <main className="w-full">
         <section className="relative w-full h-[500px] bg-[url('/images/hero-banner.jpg')] bg-cover bg-center flex items-center justify-center text-white">
            <div className="text-center bg-black bg-opacity-50 p-6 rounded-lg">
               <h1 className="text-4xl font-bold">
                  Descubre lo mejor en moda y accesorios.
               </h1>
               <p className="mt-2 text-lg">
                  Ofertas exclusivas por tiempo limitado.
               </p>
               <button className="mt-4 bg-turquoise text-black px-6 py-3 rounded-lg font-semibold">
                  Comprar Ahora
               </button>
            </div>
         </section>

         <section className="container mx-auto my-12 px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
               Más Vendidos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
               <div className="border rounded-lg shadow-lg p-4">
                  <img
                     src="/images/product-1.jpg"
                     alt="Producto 1"
                     className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">
                     Producto Destacado
                  </h3>
                  <p className="text-gray-500">$99.99</p>
                  <button className="mt-3 w-full bg-turquoise text-black py-2 rounded-lg font-semibold">
                     Agregar al Carrito
                  </button>
               </div>
            </div>
         </section>
      </main>
   );
};

export default LandingPage;
