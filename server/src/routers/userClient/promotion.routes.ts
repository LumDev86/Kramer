import { Router } from "express";
import { PromotionUserController } from "@/controllers/user/promotion.user.controller";

const userPromotionRouter = Router();
const promotionUserController = new PromotionUserController();

/**
 * @swagger
 * tags:
 *   name: User - Promotions
 *   description: Promociones visibles para usuarios
 */

/**
 * @swagger
 * /api/user/promotions:
 *   get:
 *     summary: Obtener todas las promociones
 *     tags: [User - Promotions]
 *     responses:
 *       200:
 *         description: Lista de promociones
 */
userPromotionRouter.get("/", promotionUserController.getAll);

/**
 * @swagger
 * /api/user/promotions/{id}:
 *   get:
 *     summary: Obtener detalle de una promoción por ID
 *     tags: [User - Promotions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la promoción
 *     responses:
 *       200:
 *         description: Promoción encontrada
 *       404:
 *         description: Promoción no encontrada
 */
userPromotionRouter.get("/:id", promotionUserController.getById);

export default userPromotionRouter;

