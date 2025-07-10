import { Router } from "express";
import { CategoryAdminController } from "@/controllers/admin/category.admin.controller";

const adminCategoryRouter = Router();
const categoryAdminController = new CategoryAdminController();


/**
 * @swagger
 * /:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Bebidas"
 *               image:
 *                 type: string
 *                 format: uri
 *                 example: "https://res.cloudinary.com/demo/image/upload/v1620000000/bebidas.png"
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error al crear la categoría
 */
adminCategoryRouter.post("/", categoryAdminController.create);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Actualizar una categoría existente (solo nombre)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Snacks"
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
adminCategoryRouter.put("/:id", categoryAdminController.update);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *       500:
 *         description: Error al eliminar la categoría
 */
adminCategoryRouter.delete("/:id", categoryAdminController.delete);

export default adminCategoryRouter;

