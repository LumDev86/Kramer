import { Request, Response } from "express";
import { ProductService } from "@/services/user/product.user.service";

const productService = new ProductService();

export class ProductController {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sort = req.query.sort as string | undefined;
      const brand = req.query.brand as string | undefined;
      const promotion = req.query.promotion === "true";
      const status = req.query.status as string | undefined;

      const result = await productService.getAll(page, limit, sort, brand, promotion, status);
      return res.json(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(400).json({ error: message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const product = await productService.getById(req.params.id);
      return res.json(product);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(404).json({ error: message });
    }
  }
}

