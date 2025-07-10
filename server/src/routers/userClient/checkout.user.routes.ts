import { Router } from "express";
import { CheckoutController } from "@/controllers/user/checkout.user.controller";

const checkoutRouter = Router();
const checkoutController = new CheckoutController();

/**
 * @swagger
 * api/user/checkout:
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
 *                 example: mercado_pago
 *               sessionId:
 *                 type: string
 *                 example: abc123
 *               monto:
 *                 type: number
 *                 example: 5000
 *                 description: Monto que entregará el cliente. Requerido solo si el método de pago es "cash".
 *               cbu:
 *                 type: string
 *                 example: "0000003100098765432101"
 *                 description: CBU del comercio donde el cliente debe realizar la transferencia. Solo para "mercado_pago".
 *               alias:
 *                 type: string
 *                 example: "kramer.store.mp"
 *                 description: Alias de la cuenta del comercio para pagos vía Mercado Pago. Solo para "mercado_pago".
 *               accountHolderName:
 *                 type: string
 *                 example: Kramer Store
 *                 description: Titular de la cuenta del comercio. Solo para pagos por "mercado_pago".
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error en los datos enviados o carrito vacío
 */
checkoutRouter.post("/", checkoutController.create);

export default checkoutRouter;
