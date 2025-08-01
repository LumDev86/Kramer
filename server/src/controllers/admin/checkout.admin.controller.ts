import { Request, Response } from "express";
import { AdminCheckoutService } from "@/services/admin/checkout.admin.service";

const adminCheckoutService = new AdminCheckoutService();

export class AdminCheckoutController {
  async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;

      const result = await adminCheckoutService.getAllCheckouts(page, limit);
      return res.status(200).json(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error retrieving checkouts.";
      return res.status(500).json({ error: message });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const result = await adminCheckoutService.deleteAllCheckouts();
      return res.status(200).json(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error deleting checkouts.";
      return res.status(500).json({ error: message });
    }
  }
}

