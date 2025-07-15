import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(1, "Nombre completo obligatorio"),
  email: z.string().email("Correo inválido"),
  address: z.string().min(1, "Dirección obligatoria"),
  phoneNumber: z.string().min(10, "El número de teléfono debe tener al menos 10 dígitos"),
  paymentMethod: z.enum(["cash", "mercado_pago"], {
    required_error: "Selecciona un método de pago",
  })
});
