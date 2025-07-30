import { Request, Response } from "express";
import { SalesMetricsService } from "@/services/crm/salesMetrics.service";

const salesMetricsService = new SalesMetricsService();

export class SalesMetricsController {
  async getDaily(req: Request, res: Response) {
    const data = await salesMetricsService.getDailySales();
    return res.json(data);
  }

  async getWeekly(req: Request, res: Response) {
    const data = await salesMetricsService.getWeeklySales();
    return res.json(data);
  }

  async getMonthly(req: Request, res: Response) {
    const data = await salesMetricsService.getMonthlySales();
    return res.json(data);
  }
}
