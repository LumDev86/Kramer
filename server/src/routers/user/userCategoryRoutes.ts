import { Router } from "express";
import { CategoryController } from "@controllers/category/CategoryController";

const userCategoryRouter = Router();
const categoryController = new CategoryController();


/**
 * @swagger
 * tags:
 *   name: Categories USER
 *   description: Endpoints para obtener categorías
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
userCategoryRouter.get("/", categoryController.getAll);



/**
 * @swagger
 * /api/categories/{name}/products:
 *   get:
 *     summary: Obtener productos por nombre de categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Lista de productos
 *       400:
 *         description: Categoría no encontrada
 */
userCategoryRouter.get("/:name/products", categoryController.getProductsByCategoryName);




/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 */
userCategoryRouter.get("/:id", categoryController.getById);


export default userCategoryRouter;