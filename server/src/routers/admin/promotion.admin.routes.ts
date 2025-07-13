import { Router } from "express";
import { PromotionAdminController } from "@/controllers/admin/promotion.admin.controller";

const adminPromotionRouter = Router();
const controller = new PromotionAdminController();

/**
 * @swagger
 * tags:
 *   name: Admin - Promotions
 *   description: Gestión de promociones
 */

/**
 * @swagger
 * /api/admin/promotions:
 *   post:
 *     summary: Crear nueva promoción
 *     tags: [Admin - Promotions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               data:
 *                 type: object
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Promoción creada
 */
adminPromotionRouter.post("/", controller.create);

/**
 * @swagger
 * /api/admin/promotions/{id}:
 *   put:
 *     summary: Actualizar promoción
 *     tags: [Admin - Promotions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               data:
 *                 type: object
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Promoción actualizada
 *       404:
 *         description: Promoción no encontrada
 */
adminPromotionRouter.put("/:id", controller.update);

/**
 * @swagger
 * /api/admin/promotions/{id}:
 *   delete:
 *     summary: Eliminar promoción
 *     tags: [Admin - Promotions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Promoción eliminada
 *       404:
 *         description: Promoción no encontrada
 */
adminPromotionRouter.delete("/:id", controller.delete);

export default adminPromotionRouter;

