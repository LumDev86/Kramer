import { Request, Response } from "express";
import { CategoryService } from "@/services/user/category.user.service";

const categoryService = new CategoryService();

export class CategoryController {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const categories = await categoryService.getAll();
      return res.status(200).json(categories);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const category = await categoryService.getById(req.params.id);
      return res.status(200).json(category);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const category = await categoryService.create(req.body);
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
      const category = await categoryService.update(req.params.id, req.body);
      return res.json(category);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const result = await categoryService.delete(req.params.id);
      return res.status(200).json(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  async getProductsByCategoryName(req: Request, res: Response): Promise<Response> {
    try {
      const products = await categoryService.getProductsByCategoryName(req.params.name);
      return res.status(200).json(products);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }
}

