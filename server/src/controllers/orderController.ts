/*import { Request, Response } from "express";
import { OrderService } from "../services/orderService";

const orderService = new OrderService();

export class OrderController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const orders = await orderService.getAll(limit, page);
            res.status(200).json(orders);
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error interno del servidor" });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const order = await orderService.create(req.body);
            res.status(201).json(order);
        } catch (error: any) {
            res.status(400).json({ error: error.message || "Error al crear la orden" });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const result = await orderService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message || "Error al eliminar la orden" });
        }
    }
}
*/
import { Request, Response } from "express";
import { OrderService } from "../services/orderService";

const orderService = new OrderService();

export class OrderController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const orders = await orderService.getAll(limit, page);
            res.status(200).json(orders);
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error interno del servidor" });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const order = await orderService.create(req.body);
            res.status(201).json(order);
        } catch (error: any) {
            res.status(400).json({ error: error.message || "Error al crear la orden" });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const result = await orderService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message || "Error al eliminar la orden" });
        }
    }
}
