import { Router } from "express";
import { ProductController } from "@controllers/product/productController";
import { ProductService } from "@services/productService";

const adminProductRouter = Router();
const productController = new ProductController();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para gestionar productos
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - brand
 *               - weight
 *               - description
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               weight:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               image:
 *                 type: string
 *                 description: URL de imagen (opcional si se sube archivo)
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del producto (opcional)
 *               category:
 *                 type: string
 *                 description: Nombre de la categoría existente
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
adminProductRouter.post("/", ProductService.uploadImage ,productController.create);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
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
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               image:
 *                 type: string
 *                 description: URL de imagen alternativa (opcional si se sube archivo)
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Nueva imagen del producto (opcional)
 *               category:
 *                 type: string
 *                 description: Nombre de la categoría existente
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       400:
 *         description: Error al actualizar
 */
adminProductRouter.put("/:id", ProductService.uploadImage, productController.update);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 */
adminProductRouter.delete("/:id", productController.delete);

export default adminProductRouter;

