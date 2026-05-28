'use client';
import Link from 'next/link';
import { logOutUser } from '../lib/users';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   const { setCart } = useCart();
   const { user } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (!user) router.push('/');
   }, []);

   const handleLogOut = () => {
      logOutUser();
      setCart([]);
      router.push('/');
   };
   return (
      <div className="min-h-screen flex bg-gray-100">
         <aside className="w-64 bg-white p-6 shadow-lg hidden md:block">
            <h2 className="text-xl font-bold mb-6">Mi Cuenta</h2>
            <nav className="space-y-4">
               <Link
                  href="/dashboard"
                  className="block hover:text-turquoise text-gray-400 pointer-events-none cursor-not-allowed"
               >
                  Perfil
               </Link>
               <Link
                  href="/dashboard/orders"
                  className="block hover:text-turquoise text-gray-400 pointer-events-none cursor-not-allowed"
               >
                  Mis Pedidos
               </Link>
               <Link
                  href="/dashboard/wishlist"
                  className="block hover:text-turquoise text-gray-400 pointer-events-none cursor-not-allowed"
               >
                  Lista de Deseos
               </Link>
               <Link
                  href="/dashboard/address"
                  className="block hover:text-turquoise text-gray-400 pointer-events-none cursor-not-allowed"
               >
                  Direcciones
               </Link>
               <Link
                  href="/dashboard/payment"
                  className="block hover:text-turquoise text-gray-400 pointer-events-none cursor-not-allowed"
               >
                  Métodos de Pago
               </Link>
               <Link
                  href="/dashboard/settings"
                  className="block hover:text-turquoise text-gray-400 pointer-events-none cursor-not-allowed"
               >
                  Configuración
               </Link>
               <button
                  onClick={handleLogOut}
                  className="mt-4 text-red-500 font-bold"
               >
                  Cerrar Sesión
               </button>
            </nav>
         </aside>

         <main className="flex-1 p-1 md:p-6">{children}</main>
      </div>
   );
};

export default DashboardLayout;
