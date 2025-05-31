import { Request, Response, NextFunction } from "express";
import { OrderDto } from "../dto/OrderDto";

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
    const { name, phoneNumber, address, paymentMethod, products } = req.body as OrderDto;

    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "El nombre del cliente es obligatorio." });
    }
    if (!phoneNumber || phoneNumber.trim() === "") {
        return res.status(400).json({ error: "El número de teléfono es obligatorio." });
    }
    if (!address || address.trim() === "") {
        return res.status(400).json({ error: "La dirección es obligatoria." });
    }
    if (!paymentMethod) {
        return res.status(400).json({ error: "Debe seleccionar un método de pago." });
    }
    if (!products || products.length === 0) {
        return res.status(400).json({ error: "Debe agregar al menos un producto a la orden." });
    }

    next();
};
