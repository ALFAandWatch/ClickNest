export const validateRegister = (values) => {
   const errors = {};

   if (!values.name || !values.name.trim()) {
      errors.name = '* El nombre de usuario es obligatorio.';
   } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(values.name)) {
      errors.name = 'El nombre no es válido';
   } else if (values.name.length < 4) {
      errors.name = '* El nombre debe tener al menos 4 caracteres.';
   }

   if (!values.email) {
      errors.email = '* El email es obligatorio.';
   } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
   ) {
      errors.email = 'El email es invalido';
   } else if (values.email.length < 6) {
      errors.email = '* El email debe tener al menos 6 caracteres.';
   }

   if (!values.address) {
      errors.address = 'La dirección es obligatoria.';
   }

   if (!values.phone) {
      errors.phone = 'El número de teléfono es obligatorio.';
   } else if (!/^[0-9]+$/.test(values.phone)) {
      errors.phone = 'En este campo solo se admiten números.';
   }

   if (!values.password) {
      errors.password = '* La contraseña es obligatoria.';
   } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(values.password)) {
      errors.password = 'La contraseña es invalida';
   } else if (values.password.length < 6) {
      errors.password = '* La contraseña debe tener al menos 6 caracteres.';
   }

   if (!values.passwordRepeat) {
      errors.passwordRepeat = '* Repetir la contraseña es obligatorio.';
   } else if (values.passwordRepeat !== values.password) {
      errors.passwordRepeat = 'Las contraseñas no coinciden.';
   }

   return errors;
};
