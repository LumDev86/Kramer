// src/routes/admin/banner.admin.routes.ts
import { Router } from "express";
import { BannerAdminController } from "@/controllers/admin/banner.admin.controller";
import uploadBanner from "@/middleware/multerBanner";

const adminBannerRouter = Router();
const controller = new BannerAdminController();

/**
 * @swagger
 * tags:
 *   name: Admin - Banners
 *   description: Gestión de banners publicitarios
 */

/**
 * @swagger
 * /api/admin/banners:
 *   post:
 *     summary: Subir nuevo banner
 *     tags: [Admin - Banners]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               banner:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               link:
 *                 type: string
 *               order:
 *                 type: number
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Banner subido correctamente
 */
adminBannerRouter.post("/", uploadBanner.single("banner"), controller.upload);

/**
 * @swagger
 * /api/admin/banners:
 *   get:
 *     summary: Obtener todos los banners
 *     tags: [Admin - Banners]
 *     parameters:
 *       - in: query
 *         name: activeOnly
 *         schema:
 *           type: boolean
 *         description: Si es true, solo devuelve banners activos
 *     responses:
 *       200:
 *         description: Lista de banners
 */
adminBannerRouter.get("/", controller.getAll);

/**
 * @swagger
 * /api/admin/banners/{id}:
 *   delete:
 *     summary: Eliminar banner (también en Cloudinary)
 *     tags: [Admin - Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Banner eliminado correctamente
 */
adminBannerRouter.delete("/:id", controller.delete);

export default adminBannerRouter;
