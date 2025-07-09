import { Request, Response } from "express";
import { CategoryAdminService } from "@/services/admin/category.admin.service";

const categoryAdminService = new CategoryAdminService();

export class CategoryAdminController {

    async create(req: Request, res: Response) {
        try {
            const category = await categoryAdminService.create(req.body);
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
            const category = await categoryAdminService.update(req.params.id, req.body);
            res.json(category);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result = await categoryAdminService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}
