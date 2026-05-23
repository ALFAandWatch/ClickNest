'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateRegister } from '@/helpers/validateRegister';
import { User } from '@/types/User';
import { useRouter } from 'next/navigation';
import { registerUser } from '../lib/users';
import Swal from 'sweetalert2';

const RegisterForm = () => {
   const router = useRouter();

   const handleSubmit = async (values: User) => {
      values.name = values.name.toLowerCase();

      try {
         const result = await registerUser(values);

         Swal.fire({
            icon: 'success',
            text: 'Registro realizado con éxito',
         });
         router.push('/');
      } catch (error) {
         Swal.fire({
            icon: 'error',
            text: 'Error al registrar',
         });
      }
   };

   return (
      <div className="max-w-md mx-auto mt-5 bg-white p-6 rounded-lg shadow-lg">
         <h2 className="text-2xl font-semibold text-center mb-4">Registro</h2>
         <Formik
            initialValues={{
               id: '',
               name: '',
               email: '',
               address: '',
               phone: '',
               password: '',
               passwordRepeat: '',
               orders: [],
            }}
            validate={validateRegister}
            onSubmit={handleSubmit}
         >
            {({ isSubmitting }) => (
               <Form>
                  <div className="mb-4">
                     <label className="block text-gray-700">Nombre</label>
                     <Field
                        type="text"
                        name="name"
                        className="w-full border p-2 rounded-lg"
                     />
                     <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                     />
                  </div>

                  <div className="mb-4">
                     <label className="block text-gray-700">Email</label>
                     <Field
                        type="email"
                        name="email"
                        className="w-full border p-2 rounded-lg"
                     />
                     <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                     />
                  </div>

                  <div className="mb-4">
                     <label className="block text-gray-700">Dirección</label>
                     <Field
                        type="text"
                        name="address"
                        className="w-full border p-2 rounded-lg"
                     />
                     <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm"
                     />
                  </div>

                  <div className="mb-4">
                     <label className="block text-gray-700">Teléfono</label>
                     <Field
                        type="text"
                        name="phone"
                        className="w-full border p-2 rounded-lg"
                     />
                     <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm"
                     />
                  </div>

                  <div className="mb-4">
                     <label className="block text-gray-700">Contraseña</label>
                     <Field
                        type="password"
                        name="password"
                        className="w-full border p-2 rounded-lg"
                     />
                     <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                     />
                  </div>

                  <div className="mb-4">
                     <label className="block text-gray-700">
                        Repita la contraseña
                     </label>
                     <Field
                        type="password"
                        name="passwordRepeat"
                        className="w-full border p-2 rounded-lg"
                     />
                     <ErrorMessage
                        name="passwordRepeat"
                        component="div"
                        className="text-red-500 text-sm"
                     />
                  </div>

                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full bg-turquoise text-white py-2 rounded-lg font-semibold"
                  >
                     Registrarme
                  </button>
               </Form>
            )}
         </Formik>
      </div>
   );
};

export default RegisterForm;
