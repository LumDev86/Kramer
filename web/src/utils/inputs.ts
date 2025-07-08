const personalFields = [
  { id: "email", type: "email", placeholder: "Correo" },
  { id: "address", type: "text", placeholder: "Domicilio" },
  { id: "fullName", type: "text", placeholder: "Nombre Completo" },
  { id: "phone", type: "number", placeholder: "Número de Teléfono" }
] as const;

const paymentOptions = [
  { id: "cash", label: "Efectivo (contra entrega)", value: "cash" },
  { id: "mercado_pago", label: "Mercado Pago", value: "mercado_pago" },
];

const mercadoPagoFields = [
  {
    id: "alias",
    type: "text",
    label: "Alias",
    placeholder: "Alias",
    defaultValue: "kioscokramer.mp",
  },
  {
    id: "cvu",
    type: "text",
    label: "CVU",
    placeholder: "CVU",
    defaultValue: "0000003100045871234567",
  },
  {
    id: "titular",
    type: "text",
    label: "Titular",
    placeholder: "Titular",
    defaultValue: "Kramer Comercio S.A",
  },
] as const;

export const inputs = {
  paymentOptions,
  personalFields,
  mercadoPagoFields
};
