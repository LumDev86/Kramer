import { Request, Response } from "express";
import { ProductService } from "@/services/user/product.user.service";

const productService = new ProductService();

export class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sort = req.query.sort as string | undefined;
      const brand = req.query.brand as string | undefined;
      const promotion = req.query.promotion === "true";
      const status = req.query.status as string | undefined;

      const result = await productService.getAll(
        page,
        limit,
        sort,
        brand,
        promotion,
        status
      );

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      res.json(await productService.getById(req.params.id));
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
    
}
