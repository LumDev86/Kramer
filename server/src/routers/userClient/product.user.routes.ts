import { Router } from "express";
import { ProductController } from "@/controllers/user/product.user.controller";
import upload from "@/middleware/cloudinaryMulter";

const userProductRouter = Router();
const productController = new ProductController();

/**
 * @swagger
 * tags:
 *   name: User - Products
 *   description: Endpoints para obtener productos disponibles
 */

/**
 * @swagger
 * /api/user/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [User - Products]
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
 * /api/user/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [User - Products]
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


userProductRouter.post("/", upload.single("image"), productController.create);


export default userProductRouter;

