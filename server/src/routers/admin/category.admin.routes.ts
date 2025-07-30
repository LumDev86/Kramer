import { Router } from "express";
import { CategoryAdminController } from "@/controllers/admin/category.admin.controller";
import { CategoryAdminService } from "@/services/admin/category.admin.service";

const adminCategoryRouter = Router();
const categoryAdminController = new CategoryAdminController();

/**
 * @swagger
 * tags:
 *   name: Admin - Categories
 *   description: Gestión de categorías por parte del administrador
 */

/**
 * @swagger
 * /api/admin/categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Admin - Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Bebidas"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen local para subir (archivo). Alternativamente puede enviarse un campo image en el body como URL en texto (pero no en multipart).
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error al crear la categoría
 */
adminCategoryRouter.post(
  "/",
  CategoryAdminService.uploadImage,
  categoryAdminController.create
);

/**
 * @swagger
 * /api/admin/categories/{id}:
 *   put:
 *     summary: Actualizar una categoría existente (nombre e imagen)
 *     tags: [Admin - Categories]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Snacks"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen local para subir (archivo). Opcional.
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
adminCategoryRouter.put(
  "/:id",
  CategoryAdminService.uploadImage,
  categoryAdminController.update
);

/**
 * @swagger
 * /api/admin/categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Admin - Categories]
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


