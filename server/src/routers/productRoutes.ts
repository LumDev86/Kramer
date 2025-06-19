import { Router } from "express";
import { ProductController } from "../controllers/productController";
import upload from "../middleware/validateImageProduct";
import { ProductService } from "../services/productService";

const productRouter = Router();
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
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página de resultados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de resultados por página
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc]
 *         description: Ordenar por precio ascendente o descendente
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filtrar por nombre de marca
 *       - in: query
 *         name: promotion
 *         schema:
 *           type: boolean
 *         description: Filtrar productos con promoción activa
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: Filtrar por estado del producto
 *     responses:
 *       200:
 *         description: Lista de productos
 */
productRouter.get("/", productController.getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
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
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
productRouter.get("/:id", productController.getById);

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
productRouter.post("/", ProductService.uploadImage ,productController.create);

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
productRouter.put("/:id", ProductService.uploadImage, productController.update);

/**
 * @swagger
 * /api/products/category/{category}:
 *   get:
 *     summary: Obtener productos por nombre de categoría
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Lista de productos por categoría
 *       400:
 *         description: Categoría no válida
 */
productRouter.get("/category/:category", productController.getByCategory);

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
productRouter.delete("/:id", productController.delete);

export default productRouter;

