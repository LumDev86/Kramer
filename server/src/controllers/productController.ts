import { Request, Response } from "express";
import { ProductService } from "../services/productService";

const productService = new ProductService();

export class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
  
      res.json(await productService.getAll(page, limit));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }  

  async getById(req: Request, res: Response) {
    try {
      res.json(await productService.getById(req.params.id));
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      res.status(201).json(await productService.create(req.body, req.file));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      res.json(await productService.update(req.params.id, req.body, req.file));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      res.status(200).json(await productService.delete(req.params.id));
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getByCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
  
      res.json(await productService.getByCategory(category, page, limit));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  
}
