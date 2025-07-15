import { z } from "zod";

export const authRegisterSchema = z.object({
  name: z.string().min(1, "Nombre completo obligatorio"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "Contraseña obligatoria"),
});

export const authLoginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "Contraseña obligatoria"),
});

export const authFormSchema = z.union([authRegisterSchema, authLoginSchema]);