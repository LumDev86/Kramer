import { Request, Response } from "express";
import { CategoryAdminService } from "@/services/admin/category.admin.service";

const categoryAdminService = new CategoryAdminService();

export class CategoryAdminController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      // Pasamos req.body y req.file al service
      const category = await categoryAdminService.create(req.body, req.file);
      return res.status(201).json({
        message: "Categoría creada exitosamente.",
        category,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(400).json({ error: message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      // Pasamos req.body y req.file al service
      const category = await categoryAdminService.update(req.params.id, req.body, req.file);
      return res.json(category);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const result = await categoryAdminService.delete(req.params.id);
      return res.status(200).json(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }
}


