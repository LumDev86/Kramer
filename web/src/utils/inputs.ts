/**
 * Inputs para formulario del checkout
 */
const personalFields = [
  { id: "email", type: "email", placeholder: "Correo" },
  { id: "address", type: "text", placeholder: "Domicilio" },
  { id: "fullName", type: "text", placeholder: "Nombre Completo" },
  { id: "phoneNumber", type: "text", placeholder: "Número de Teléfono" },
] as const;

const paymentOptions = [
  { id: "cash", label: "Efectivo (contra entrega)", value: "cash" },
  { id: "mercado_pago", label: "Mercado Pago", value: "mercado_pago" },
];

const mercadoPagoFields = [
  { label: "Alias", defaultValue: "kioscokramer.mp" },
  { label: "CVU", defaultValue: "0000003100045871234567" },
  { label: "Titular", defaultValue: "Lucas Segovia" },
] as const;

/**
 * Inputs para formulario de autenticación de administrador
 */
const authRegisterField = [
  { id: "name", type: "text", placeholder: "Nombre Completo" },
  { id: "email", type: "email", placeholder: "Correo" },
  { id: "password", type: "password", placeholder: "Contraseña" },
] as const;

const authLoginField = [
  { id: "email", type: "email", placeholder: "Correo" },
  { id: "password", type: "password", placeholder: "Contraseña" },
] as const;

/**
 * Inputs para formulario de agregar productos para el administrador
 */
const addProductFields = [
  { id: "name", type: "text", placeholder: "Nombre del Producto" },
  { id: "brand", type: "text", placeholder: "Marca" },
  { id: "weight", type: "number", placeholder: "Peso" },
  { id: "stock", type: "number", placeholder: "Cantidad en Stock" },
  { id: "price", type: "number", placeholder: "Precio" },
] as const;

export const inputs = {
  paymentOptions,
  personalFields,
  mercadoPagoFields,
  authRegisterField,
  authLoginField,
  addProductFields
};
