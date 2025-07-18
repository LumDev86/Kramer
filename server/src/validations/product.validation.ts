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
    .number("El precio debe ser un número")
    .positive("El precio debe ser mayor a 0")
    .max(9999999999.99, "El precio es demasiado alto"),

  stock: z
    .number("El stock debe ser un número")
    .int("El stock debe ser un número entero")
    .nonnegative("El stock no puede ser negativo"),

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