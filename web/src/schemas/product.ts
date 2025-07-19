import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  brand: z.string().min(1, "La marca es obligatoria"),
  weight: z.string().min(1, "El peso es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  price: z.coerce.number().positive("El precio debe ser mayor a 0"),
  stock: z.coerce.number().positive("El stock debe ser mayor a 0"),
  image: z.any().optional(),
  category: z.string().optional(),
});
