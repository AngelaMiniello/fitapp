import { ILoginErrors, ILoginProps, IRegisterErrors, IRegisterProps } from "../types/types";

export const validateFormLogin = (values: ILoginProps) => {
const errors: ILoginErrors = {};

if (!values.email) {
    errors.email = "Email requerido";
}

if (!values.password) {
    errors.password = "Contraseña requerida";
}

return errors;
};

export const ValidateFormRegister = (values:IRegisterProps) =>{
    const errors: IRegisterErrors = {};
    
    if (!values.username?.trim()) {
      errors.username = "El username es obligatorio";
    } else if (values.username.trim().length < 2) {
      errors.username = "El username debe tener al menos 2 caracteres";
    } else if (values.username.trim().length > 20) {
      errors.username = "El username no puede superar 20 caracteres";
    } else if (/\s/.test(values.username)) {
      errors.username = "El username no puede contener espacios";
    }

    if (!values.mail) {
      errors.mail = "Email requerido";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.mail)) {
      errors.mail = "Email invalido";
    }

    if (!values.password) {
      errors.password = "Contraseña requerida";
    } else if (values.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
      errors.password = "Debe incluir mayuscula, minuscula, numero y caracter especial";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirma tu contraseña";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
};