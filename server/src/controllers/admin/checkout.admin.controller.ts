import { Request, Response } from "express";
import { AdminCheckoutService } from "@/services/admin/checkout.admin.service";

const adminCheckoutService = new AdminCheckoutService();

export class AdminCheckoutController {
  async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5; // 👈 límite fijo por defecto en 5

      const result = await adminCheckoutService.getAllCheckouts(page, limit);
      return res.status(200).json(result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const result = await adminCheckoutService.deleteAllCheckouts();
      return res.status(200).json(result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }
}
