import { Request, Response } from "express";
import { PromotionAdminService } from "@/services/admin/promotion.admin.service";

const promotionService = new PromotionAdminService();

export class PromotionAdminController {
  create = async (req: Request, res: Response) => {
    try {
      const newPromo = await promotionService.create(req.body);
      return res.status(201).json(newPromo);
    } catch (error) {
      return res.status(400).json({ message: "Error al crear promoción", error });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updated = await promotionService.update(id, req.body);
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(400).json({ message: "Error al actualizar promoción", error });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await promotionService.delete(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ message: "Promoción no encontrada", error });
    }
  };
}
