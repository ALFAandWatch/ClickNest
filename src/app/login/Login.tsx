'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateLogin } from '@/helpers/validateLogin';
import { loginUser } from '../lib/users';
import { LoginObject } from '@/types/LoginObject';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const LoginForm = () => {
   const { setIsAuthenticated, setUser } = useAuth();
   const router = useRouter();
   const handleSubmit = async (values: LoginObject) => {
      const login = await loginUser(values);

      if (login && login.session) {
         setIsAuthenticated(true);
         setUser(login.user);
         router.push('/dashboard');
      }
   };
   return (
      <div className="max-w-md mx-auto mt-5 bg-white p-6 rounded-lg shadow-lg">
         <h2 className="text-2xl font-semibold text-center mb-4">Ingresar</h2>
         <Formik
            initialValues={{ email: '', password: '' }}
            validate={validateLogin}
            onSubmit={handleSubmit}
         >
            {({ isSubmitting }) => (
               <Form>
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

                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full bg-turquoise text-white py-2 rounded-lg font-semibold"
                  >
                     Ingresar
                  </button>
               </Form>
            )}
         </Formik>
      </div>
   );
};

export default LoginForm;
