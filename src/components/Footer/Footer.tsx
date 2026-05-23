import { FC } from 'react';

const Footer: FC = () => {
   return (
      <footer className="bg-gray-900 text-white py-10">
         <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
            {/* Customer Support */}
            <div>
               <h3 className="text-lg font-semibold mb-3">
                  Atención al Cliente
               </h3>
               <ul className="space-y-2 text-sm">
                  <li>
                     <a href="#" className="hover:text-turquoise">
                        Contacto
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:text-turquoise">
                        Envíos y Entregas
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:text-turquoise">
                        Devoluciones
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:text-turquoise">
                        Preguntas Frecuentes
                     </a>
                  </li>
               </ul>
            </div>

            {/* Company Info */}
            <div>
               <h3 className="text-lg font-semibold mb-3">Sobre Nosotros</h3>
               <ul className="space-y-2 text-sm">
                  <li>
                     <a href="#" className="hover:text-turquoise">
                        Nuestra Historia
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:text-turquoise">
                        Blog
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:text-turquoise">
                        Trabaja con Nosotros
                     </a>
                  </li>
               </ul>
            </div>

            {/* Policies */}
            <div>
               <h3 className="text-lg font-semibold mb-3">Políticas</h3>
               <ul className="space-y-2 text-sm">
                  <li>
                     <a href="#" className="hover:text-turquoise">
                        Política de Privacidad
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:text-turquoise">
                        Términos y Condiciones
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:text-turquoise">
                        Métodos de Pago
                     </a>
                  </li>
               </ul>
            </div>

            {/* Social Media & Newsletter */}
            <div>
               <h3 className="text-lg font-semibold mb-3">Síguenos</h3>
               <div className="flex flex-col">
                  <a href="#" className="hover:text-turquoise">
                     <img
                        className="invert inline me-2"
                        src="icons/facebook.svg"
                        alt="Facebook"
                     />
                     Facebook
                  </a>
                  <a href="#" className="hover:text-turquoise">
                     <img
                        className="invert inline me-2"
                        src="icons/instagram.svg"
                        alt="Instagram"
                     />
                     Instagram
                  </a>
                  <a href="#" className="hover:text-turquoise">
                     <img
                        className="invert inline me-2"
                        src="icons/x.svg"
                        alt="X"
                     />
                     X
                  </a>
               </div>
            </div>
         </div>

         {/* Bottom Footer */}
         <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
            <p>
               © {new Date().getFullYear()} ClickNest. Todos los derechos
               reservados.
            </p>
         </div>
      </footer>
   );
};

export default Footer;
