import { Router } from "express";
import { ProductAdminController } from "@/controllers/admin/product.admin.controller";
import { ProductAdminService } from "@/services/admin/product.admin.service";

const adminProductRouter = Router();
const productAdminController = new ProductAdminController();

/**
 * @swagger
 * tags:
 *   name: Admin - Products
 *   description: Gestión de productos por parte del administrador
 */

/**
 * @swagger
 * /api/admin/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Admin - Products]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               weight:
 *                 type: number
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error al crear el producto
 */
adminProductRouter.post("/", ProductAdminService.uploadImage ,productAdminController.create);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [Admin - Products]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               weight:
 *                 type: number
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               status:
 *                 type: boolean
 *               categoryId:
 *                 type: string
 *               promotionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       400:
 *         description: Error al actualizar el producto
 */
adminProductRouter.put("/:id", ProductAdminService.uploadImage, productAdminController.update);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Admin - Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 */
adminProductRouter.delete("/:id", productAdminController.delete);

export default adminProductRouter;


