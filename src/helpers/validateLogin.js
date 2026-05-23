export const validateLogin = (values) => {
   const errors = {};

   if (!values.email) {
      errors.email = '* El email es obligatorio.';
   } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
   ) {
      errors.email = 'El email es invalido';
   } else if (values.email.length < 6) {
      errors.email = '* El email debe tener al menos 6 caracteres.';
   }

   if (!values.password) {
      errors.password = '* La contraseña es obligatoria.';
   } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(values.password)) {
      errors.password = 'La contraseña es invalida';
   } else if (values.password.length < 6) {
      errors.password = '* La contraseña debe tener al menos 6 caracteres.';
   }

   return errors;
};
