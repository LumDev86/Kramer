import { z } from "zod";

export const promotionSchema = z
  .object({
    title: z.string().min(1, "El titulo es obligatorio"),
    description: z.string().min(1, "La descripción es obligatoria"),
    type: z.string(),
    percent: z.string().optional(),
    buy: z.string().optional(),
    pay: z.string().optional(),
    minQuantity: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "descuento" && !data.percent) {
      ctx.addIssue({
        path: ["percent"],
        code: z.ZodIssueCode.custom,
        message: "Debes ingresar un porcentaje",
      });
    }

    if (data.type === "combo") {
      if (!data.buy) {
        ctx.addIssue({
          path: ["buy"],
          code: z.ZodIssueCode.custom,
          message: "Debes ingresar la cantidad de productos",
        });
      }
      if (!data.pay) {
        ctx.addIssue({
          path: ["pay"],
          code: z.ZodIssueCode.custom,
          message: "Debes ingresar el precio del combo",
        });
      }
    }

    if (data.type === "regalo" && !data.minQuantity) {
      ctx.addIssue({
        path: ["minQuantity"],
        code: z.ZodIssueCode.custom,
        message: "Debes ingresar la cantidad mínima para el regalo",
      });
    }
  });

export type PromotionFormSchema = z.infer<typeof promotionSchema>;
