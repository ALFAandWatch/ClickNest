'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { logOutUser } from '@/app/lib/users';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
   const { isAuthenticated } = useAuth();
   const { cart, setCart } = useCart();
   const router = useRouter();

   const handleLogOut = async () => {
      await logOutUser();
      setCart([]);
      router.push('/');
   };

   const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);

   return (
      <>
         <div className=" bg-black flex flex-row items-center px-3">
            <div className="basis-1/3">
               <Link href="/">
                  <h2 className="text-white align-middle text-lg md:text-4xl font-sans font-bold inline">
                     ClickNest
                  </h2>
                  <img
                     className="inline p-2 align-middle w-10 md:w-12 aspect-square"
                     src="/icons/raven.svg"
                     alt="ClickNest"
                  />
               </Link>
            </div>
            <div className="basis-2/3 flex flex-row justify-end">
               {!isAuthenticated ? (
                  <>
                     <div className="pe-1">
                        <Link href="/login">
                           <button className="bg-black p-2 px-3 my-2 text-turquoise rounded-md font-sans font-light hover:brightness-150 border border-black hover:border hover:border-turquoise transition duration-500 ease-in-out">
                              Ingresar
                           </button>
                        </Link>
                     </div>
                     <div className="px-1">
                        <Link href="/register">
                           <button className="bg-turquoise p-2 px-3 my-2 text-black rounded-md font-sans font-light hover:brightness-150 transition duration-500 ease-in-out">
                              Registrarme
                           </button>
                        </Link>
                     </div>
                  </>
               ) : (
                  <>
                     <div>
                        <ul className="flex flex-row px-2wq">
                           <li>
                              <Link href="/dashboard">
                                 <img
                                    className="p-2 py-4 hover:brightness-200 hover:cursor-pointer"
                                    src="icons/user.svg"
                                    alt="Perfil"
                                 />
                              </Link>
                           </li>
                           <li className="relative">
                              <Link href="/cart">
                                 <img
                                    className="p-2 py-4 hover:brightness-200 hover:cursor-pointer"
                                    src="icons/cart.svg"
                                    alt="Carrito"
                                 />
                                 {totalItems > 0 && (
                                    <span className="absolute bottom-8 left-6 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                       {totalItems}
                                    </span>
                                 )}
                              </Link>
                           </li>
                        </ul>
                     </div>
                     <div className="pe-1">
                        <button
                           className="bg-black p-2 px-3 my-2 text-turquoise rounded-md font-sans font-light hover:brightness-150 border border-black hover:border hover:border-turquoise transition duration-500 ease-in-out"
                           onClick={handleLogOut}
                        >
                           Cerrar Sesión
                        </button>
                     </div>
                  </>
               )}
            </div>
         </div>

         {/* MOBILE NAV */}
         <div className=" bg-turquoise flex flex-row justify-start md:hidden px-3 text-sm py-1">
            <Link href="/categories">
               <button className="p-2 px-3 rounded-md bg-black text-turquoise hover:brightness-150 font-light hover:cursor-pointer">
                  Todas las Categorías
               </button>
            </Link>
         </div>

         {/* FULL NAV */}
         <div
            id="inf-nav"
            className="hidden bg-turquoise md:flex flex-row px-3 gap-3 text-sm py-1 overflow-hidden"
         >
            <Link href="/categories">
               <button className="inf-nav-button bg-black text-turquoise hover:brightness-150 font-light hover:cursor-pointer">
                  Todas las Categorías
               </button>
            </Link>
            <Link href="/products/1" className="inf-nav-button">
               Smartphones
            </Link>
            <Link href="/products/2" className="inf-nav-button">
               Laptops
            </Link>
            <Link href="/products/3" className="inf-nav-button">
               Tablets
            </Link>
            <Link href="/products/4" className="inf-nav-button">
               Auriculares
            </Link>
            <Link href="/products/5" className="inf-nav-button">
               Cámaras
            </Link>
            <Link href="/products/6" className="inf-nav-button">
               Impresoras
            </Link>
            <Link href="/monitors" className="inf-nav-button">
               Monitores
            </Link>
            <Link href="/storage" className="inf-nav-button">
               Mobiliario
            </Link>
            <Link href="/accessories" className="inf-nav-button">
               Accesorios
            </Link>
         </div>
      </>
   );
};

export default Navbar;
