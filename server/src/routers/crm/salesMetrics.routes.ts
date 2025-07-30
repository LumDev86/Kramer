import { Router } from "express";
import { SalesMetricsController } from "@/controllers/crm/salesMetrics.controller";

const router = Router();
const controller = new SalesMetricsController();

/**
 * @swagger
 * tags:
 *   name: CRM - Sales Metrics
 *   description: Métricas de ventas para el dashboard
 */

router.get("/daily", controller.getDaily);
router.get("/weekly", controller.getWeekly);
router.get("/monthly", controller.getMonthly);

export default router;
