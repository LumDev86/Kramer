import { Router } from "express";
import { CheckoutController } from "@/controllers/user/checkout.user.controller";

const checkoutRouter = Router();
const checkoutController = new CheckoutController();

/**
 * @swagger
 * tags:
 *   name: User - Checkout
 *   description: Endpoints relacionados con el proceso de checkout de usuarios
 */

/**
 * @swagger
 * /api/user/checkout:
 *   post:
 *     summary: Crear un nuevo pedido (checkout) con los productos del carrito
 *     tags: [User - Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phoneNumber
 *               - address
 *               - paymentMethod
 *               - sessionId
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Lucas Segovia
 *               phoneNumber:
 *                 type: string
 *                 example: "1133445566"
 *               address:
 *                 type: string
 *                 example: Av. Siempre Viva 123
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, mercado_pago]
 *               sessionId:
 *                 type: string
 *                 example: abc123
 *               cbu:
 *                 type: string
 *                 example: "0000003100098765432101"
 *               alias:
 *                 type: string
 *                 example: "kramer.store.mp"
 *               accountHolderName:
 *                 type: string
 *                 example: Lucas Segovia
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error en los datos enviados o carrito vacío
 */
checkoutRouter.post("/", checkoutController.create);

export default checkoutRouter;
