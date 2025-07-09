import { ProductAdminService } from "@/services/admin/product.admin.service";
import { Request, Response } from "express";

const productAdminService = new ProductAdminService();

export class ProductAdminController {
  // Método para crear un nuevo producto Corresponde a la folder admin
  async create(req: Request, res: Response) {
    try {
      const newProduct = await productAdminService.create(req.body, req.file); 
      res.status(201).json({
        message: "Producto creado exitosamente.",
        product: newProduct
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Método para actualizar un producto Corresponde a la folder admin
  async update(req: Request, res: Response) {
    try {
      const result = await productAdminService.update(req.params.id, req.body, req.file);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Método para eliminar un producto Corresponde a la folder admin
  async delete(req: Request, res: Response) {
    try {
      res.status(200).json(await productAdminService.delete(req.params.id));
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

}