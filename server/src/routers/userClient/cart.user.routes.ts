import { Router } from "express";
import { CartController } from "@/controllers/user/cart.user.controller";

const cartRouter = Router();
const cartController = new CartController();

/**
 * @swagger
 * tags:
 *   name: User - Cart
 *   description: Endpoints para manejar el carrito de compras del usuario
 */

/**
 * @swagger
 * /api/user/cart/{sessionId}:
 *   get:
 *     summary: Obtener todos los productos del carrito por sessionId
 *     tags: [User - Cart]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador de sesión del carrito
 *     responses:
 *       200:
 *         description: Lista de productos en el carrito
 */
cartRouter.get("/:sessionId", cartController.getItems.bind(cartController));

/**
 * @swagger
 * /api/user/cart/{sessionId}/items:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags: [User - Cart]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador de sesión del carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto agregado al carrito
 */
cartRouter.post("/:sessionId/items", cartController.addItem.bind(cartController));

/**
 * @swagger
 * /api/user/cart/{sessionId}/items/{cartItemId}:
 *   put:
 *     summary: Actualizar la cantidad de un producto en el carrito
 *     tags: [User - Cart]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sesión del carrito
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del ítem del carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       400:
 *         description: Datos inválidos
 */
cartRouter.put("/:sessionId/items/:cartItemId", cartController.updateItem.bind(cartController));

/**
 * @swagger
 * /api/user/cart/{sessionId}/items/{cartItemId}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     tags: [User - Cart]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito
 */
cartRouter.delete("/:sessionId/items/:cartItemId", cartController.removeItem.bind(cartController));

/**
 * @swagger
 * /api/user/cart/{sessionId}:
 *   delete:
 *     summary: Vaciar todo el carrito de una sesión
 *     tags: [User - Cart]
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito vaciado correctamente
 */
cartRouter.delete("/:sessionId", cartController.clearCart.bind(cartController));

export default cartRouter;

