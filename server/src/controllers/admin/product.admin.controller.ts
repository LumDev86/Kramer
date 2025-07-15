import { ProductAdminService } from "@/services/admin/product.admin.service";
import { Request, Response } from "express";

const productAdminService = new ProductAdminService();

export class ProductAdminController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const newProduct = await productAdminService.create(req.body, req.file);
      return res.status(201).json({
        message: "Producto creado exitosamente.",
        product: newProduct,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(400).json({ error: message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const result = await productAdminService.update(req.params.id, req.body, req.file);
      return res.json(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(400).json({ error: message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const result = await productAdminService.delete(req.params.id);
      return res.status(200).json(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(404).json({ error: message });
    }
  }
}
