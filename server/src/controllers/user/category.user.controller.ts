import { Request, Response } from "express";
import { CategoryService } from "@/services/user/category.user.service";

const categoryService = new CategoryService();

export class CategoryController {
    async getAll(req: Request, res: Response) {
        try {
            const categories = await categoryService.getAll();
            res.status(200).json(categories);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const category = await categoryService.getById(req.params.id);
            res.status(200).json(category);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const category = await categoryService.create(req.body);
            res.status(201).json({
                message: "Categoría creada exitosamente.",
                category,
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const category = await categoryService.update(req.params.id, req.body);
            res.json(category);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result = await categoryService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProductsByCategoryName(req: Request, res: Response) {
        try {
            const products = await categoryService.getProductsByCategoryName(req.params.name);
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
