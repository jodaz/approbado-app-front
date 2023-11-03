const globalUserEmail = {
    rules: {
        required: true,
        unique: true,
        notfound: true,
        deleted: true,
        verify: true
    },
    messages: {
        required: "Campo requerido.",
        deleted: "La cuenta asociada ha sido eliminada por el usuario.",
        unique: "El correo ha sido registrado.",
        verify: "Debe verificar su correo electrónico.",
        notfound: "El usuario no ha sido encontrado.",
    }
}

export const USERNAME = globalUserEmail

export const PHONE = {
    rules: {
        required: true,
        pattern: /^\d+$/,
        notfound: true,
        unique: true,
        minLength: 3,
        deleted: true,
    },
    messages: {
        required: "Campo requerido.",
        pattern: "Introduzca un número de teléfono válido",
        notfound: "El usuario no ha sido encontrado.",
        unique: "El teléfono ha sido registrado.",
        minLength: "El teléfono es muy corto.",
        deleted: "La cuenta asociada ha sido eliminada por el usuario.",
    },
};

export const PASSWORD = {
    rules: {
        required: true,
        minLength: 6,
        maxLength: 12,
        invalid: true,
        validate: true
    },
    messages: {
        required: "Campo requerido.",
        minLength: "Mínimo 6 caracteres.",
        maxLength: "La contraseña no puede exceder los 12 dígitos.",
        validate: "Las contraseñas no coinciden.",
        invalid: "Contraseña incorrecta.",
    },
};

export const CONFIRM_PASSWORD = {
    rules: {
        required: true,
        minLength: 6,
        maxLength: 12,
        different: true,
        validate: true
    },
    messages: {
        required: "Campo requerido.",
        maxLength: "La contraseña no puede exceder los 12 dígitos",
        different: "La nueva contraseña no debe ser igual a la anterior",
        minLength: "Mínimo 6 caracteres",
        validate: "Las contraseñas no coinciden.",
    },
};

export const EMAIL = {
    rules: {
        ...globalUserEmail.rules,
        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    messages: {
        ...globalUserEmail.messages,
        pattern: "Email inválido"
    },
};

export const NAME = {
    rules: {
        required: true,
        pattern: /^[a-zA-Z ]*$/,
    },
    messages: {
        pattern: "Introduzca un nombre válido",
        required: "Campo requerido.",
    },
};

export const LAST_NAME = {
    rules: NAME.rules,
    messages: {
        ...NAME.messages,
        pattern: "Introduzca un apellido válido",
    },
};
