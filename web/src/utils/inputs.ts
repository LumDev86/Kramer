const personalFields = [
  { id: "email", type: "email", placeholder: "Correo" },
  { id: "address", type: "text", placeholder: "Domicilio" },
  { id: "fullName", type: "text", placeholder: "Nombre Completo" },
  { id: "phoneNumber", type: "text", placeholder: "Número de Teléfono" }
] as const;

const paymentOptions = [
  { id: "cash", label: "Efectivo (contra entrega)", value: "cash" },
  { id: "mercado_pago", label: "Mercado Pago", value: "mercado_pago" },
];

const mercadoPagoFields = [
  {
    label: "Alias",
    defaultValue: "kioscokramer.mp",
  },
  {
    label: "CVU",
    defaultValue: "0000003100045871234567",
  },
  {
    label: "Titular",
    defaultValue: "Lucas Segovia",
  },
] as const;

export const inputs = {
  paymentOptions,
  personalFields,
  mercadoPagoFields
};
