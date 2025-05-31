import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateProduct = [
  body("name").notEmpty().withMessage("El nombre es requerido."),
  body("description").notEmpty().withMessage("La descripción es requerida."),
  body("price").isFloat({ gt: 0 }).withMessage("El precio debe ser mayor a 0."),
  body("stock").isInt({ min: 0 }).withMessage("El stock no puede ser negativo."),
  body("category").notEmpty().withMessage("La categoría es requerida."),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];