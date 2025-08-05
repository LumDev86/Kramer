import { Router } from "express";
import { SalesMetricsController } from "@/controllers/crm/salesMetrics.controller";

const salesMetricsRouter = Router();
const controller = new SalesMetricsController();

/**
 * @swagger
 * tags:
 *   name: CRM - Sales Metrics
 *   description: Métricas de ventas para el dashboard
 */

/**
 * @swagger
 * /api/crm/sales/daily:
 *   get:
 *     summary: Obtener métricas de ventas diarias
 *     tags: [CRM - Sales Metrics]
 *     description: Devuelve las ventas totales y la cantidad de órdenes para el día actual en horario de Argentina.
 *     responses:
 *       200:
 *         description: Métricas de ventas diarias obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSales:
 *                   type: number
 *                   description: Monto total de ventas del día
 *                 totalOrders:
 *                   type: integer
 *                   description: Cantidad total de órdenes del día
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   description: Inicio del período consultado
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   description: Fin del período consultado
 */
salesMetricsRouter.get("/daily", controller.getDaily);

/**
 * @swagger
 * /api/crm/sales/weekly:
 *   get:
 *     summary: Obtener métricas de ventas semanales
 *     tags: [CRM - Sales Metrics]
 *     description: Devuelve las ventas totales y la cantidad de órdenes de los últimos 7 días en horario de Argentina.
 *     responses:
 *       200:
 *         description: Métricas de ventas semanales obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSales:
 *                   type: number
 *                   description: Monto total de ventas de la semana
 *                 totalOrders:
 *                   type: integer
 *                   description: Cantidad total de órdenes de la semana
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   description: Inicio del período consultado
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   description: Fin del período consultado
 */
salesMetricsRouter.get("/weekly", controller.getWeekly);

/**
 * @swagger
 * /api/crm/sales/monthly:
 *   get:
 *     summary: Obtener métricas de ventas mensuales
 *     tags: [CRM - Sales Metrics]
 *     description: Devuelve las ventas totales y la cantidad de órdenes desde el inicio del mes actual hasta hoy, en horario de Argentina.
 *     responses:
 *       200:
 *         description: Métricas de ventas mensuales obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSales:
 *                   type: number
 *                   description: Monto total de ventas del mes
 *                 totalOrders:
 *                   type: integer
 *                   description: Cantidad total de órdenes del mes
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   description: Inicio del período consultado
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   description: Fin del período consultado
 */
salesMetricsRouter.get("/monthly", controller.getMonthly);

export default salesMetricsRouter;

