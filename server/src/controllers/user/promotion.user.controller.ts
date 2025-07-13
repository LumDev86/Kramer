import { Request, Response } from "express";
import { PromotionService } from "@/services/user/promotion.user.service";

const promotionService = new PromotionService();

export class PromotionUserController {
    getAll = async (req: Request, res: Response) => {
        try {
        const promotions = await promotionService.getAll();
        return res.status(200).json(promotions);
        } catch (error) {
        return res.status(500).json({ message: "Error al obtener promociones", error });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
        const { id } = req.params;
        const promotion = await promotionService.getById(id);
        return res.status(200).json(promotion);
        } catch (error) {
        return res.status(404).json({ message: "Promoción no encontrada", error });
        }
    };
}
