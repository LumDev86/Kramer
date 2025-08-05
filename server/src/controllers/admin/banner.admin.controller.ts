// src/controllers/admin/banner.admin.controller.ts
import { Request, Response } from "express";
import { BannerAdminService } from "@/services/admin/banner.admin.service";

const bannerService = new BannerAdminService();

export class BannerAdminController {
  upload = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.file) throw new Error("No se subió ninguna imagen");
      
      const file = req.file as Express.Multer.File;
      const { title, description, link, order, active } = req.body;

      const newBanner = await bannerService.create({
        imageUrl: file.path,
        publicId: file.filename,
        title,
        description,
        link,
        order: order ? parseInt(order, 10) : undefined,
        active: active === "true",
      });

      return res.status(201).json({
        message: "Banner creado correctamente",
        banner: newBanner
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(400).json({ message: "Error al subir banner", error: message });
    }
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { activeOnly } = req.query;
      const banners = await bannerService.getAll(activeOnly === "true");

      return res.status(200).json({
        message: banners.length > 0
          ? "Banners obtenidos correctamente"
          : "No se encontraron banners",
        banners
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(400).json({ message: "Error al obtener banners", error: message });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const result = await bannerService.delete(id);
      return res.status(200).json(result); // Ya devuelve { message: "Banner eliminado correctamente" }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(400).json({ message: "Error al eliminar banner", error: message });
    }
  };
}

