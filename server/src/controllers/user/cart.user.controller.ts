import { Request, Response } from "express";
import { CartService } from "@/services/user/cart.user.service";

const cartService = new CartService();

export class CartController {
  async getItems(req: Request, res: Response): Promise<Response> {
    try {
      const sessionId = req.params.sessionId;
      const items = await cartService.getCartItems(sessionId);
      return res.json(items);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  async addItem(req: Request, res: Response): Promise<Response> {
    try {
      const sessionId = req.params.sessionId;
      const { productId, quantity } = req.body;
      const item = await cartService.addItem(sessionId, productId, quantity);
      return res.status(201).json(item);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(400).json({ error: message });
    }
  }

  async updateItem(req: Request, res: Response): Promise<Response> {
    try {
      const sessionId = req.params.sessionId;
      const cartItemId = req.params.cartItemId;
      const { quantity } = req.body;
      const item = await cartService.updateItem(sessionId, cartItemId, quantity);
      return res.json(item);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(400).json({ error: message });
    }
  }

  async removeItem(req: Request, res: Response): Promise<Response> {
    try {
      const sessionId = req.params.sessionId;
      const cartItemId = req.params.cartItemId;
      const result = await cartService.removeItem(sessionId, cartItemId);
      return res.json(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(404).json({ error: message });
    }
  }

  async clearCart(req: Request, res: Response): Promise<Response> {
    try {
      const sessionId = req.params.sessionId;
      const result = await cartService.clearCart(sessionId);
      return res.json(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }
}


