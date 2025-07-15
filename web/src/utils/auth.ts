const authRegisterField = [
  { id: "name", type: "text", placeholder: "Nombre Completo" },
  { id: "email", type: "email", placeholder: "Correo" },
  { id: "password", type: "password", placeholder: "Contraseña" },
] as const;

export const auth = {
  authRegisterField,
};
