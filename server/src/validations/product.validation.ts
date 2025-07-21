import { z } from "zod";
import { ProductStatus } from "@/enums/ProductStatus";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(255, "El nombre no debe superar los 255 caracteres"),

  brand: z
    .string()
    .min(1, "La marca es obligatoria")
    .max(255, "La marca no debe superar los 255 caracteres"),

  weight: z
    .string()
    .min(1, "El peso es obligatorio")
    .max(50, "El peso no debe superar los 50 caracteres"),

  description: z
    .string()
    .min(1, "La descripción es obligatoria"),

  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Precio inválido",
    }),
  stock: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val >= 0, {
      message: "Stock inválido",
    }),

  image: z
    .url("La URL de la imagen no es válida")
    .max(255, "La URL de la imagen no debe superar los 255 caracteres")
    .optional()
    .nullable(),

  imagePublicId: z
    .string()
    .max(255, "El ID público de la imagen no debe superar los 255 caracteres")
    .optional()
    .nullable(),

  status: z
    .enum(ProductStatus, {
      message: "Estado inválido",
    })
    .optional(),

  categoryId: z
    .uuid("El ID de categoría debe ser un UUID válido")
    .optional()
    .nullable(),

  promotionId: z
    .uuid("El ID de promoción debe ser un UUID válido")
    .optional()
    .nullable(),
});



export const UpdateProductSchema = ProductSchema.partial();