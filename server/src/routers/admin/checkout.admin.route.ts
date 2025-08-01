import { Router } from "express";
import { AdminCheckoutController } from "@/controllers/admin/checkout.admin.controller";

const adminCheckoutRouter = Router();
const adminCheckoutController = new AdminCheckoutController();

/**
 * @swagger
 * tags:
 *   name: Admin - Checkout
 *   description: Endpoints para la gestión de formularios de checkout desde el panel de administrador.
 */

/**
 * @swagger
 * /api/admin/checkout:
 *   get:
 *     summary: Obtener checkouts paginados
 *     description: Recupera una lista paginada de todos los formularios de checkout realizados por los usuarios, incluyendo los productos asociados a cada compra.
 *     tags: [Admin - Checkout]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página (por defecto es 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de resultados por página (por defecto es 10)
 *     responses:
 *       200:
 *         description: Lista paginada de checkouts obtenida exitosamente.
 *       500:
 *         description: Error del servidor al obtener los checkouts.
 */
adminCheckoutRouter.get("/", adminCheckoutController.getAll);

/**
 * @swagger
 * /api/admin/checkout/delete-all:
 *   delete:
 *     summary: Eliminar todos los checkouts
 *     description: Elimina permanentemente todos los formularios de checkout almacenados en la base de datos. Uso exclusivo del administrador.
 *     tags: [Admin - Checkout]
 *     responses:
 *       200:
 *         description: Todos los checkouts fueron eliminados correctamente.
 *       500:
 *         description: Error del servidor al intentar eliminar los checkouts.
 */
adminCheckoutRouter.delete("/delete-all", adminCheckoutController.deleteAll);


export default adminCheckoutRouter;
