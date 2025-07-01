import { Router } from "express";
import { ProductController } from "@controllers/product/productController";

const userProductRouter = Router();
const productController = new ProductController();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para obtener productos
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
userProductRouter.get("/", productController.getAll);

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
userProductRouter.get("/:id", productController.getById);


export default userProductRouter;

