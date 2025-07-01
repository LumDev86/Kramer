import { Request, Response } from "express";
import { CartService } from "@services/cartService";

const cartService = new CartService();

export class CartController {
  async getItems(req: Request, res: Response) {
    try {
      const sessionId = req.params.sessionId;
      const items = await cartService.getCartItems(sessionId);
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async addItem(req: Request, res: Response) {
    try {
      const sessionId = req.params.sessionId;
      const { productId, quantity } = req.body;
      const item = await cartService.addItem(sessionId, productId, quantity);
      res.status(201).json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const sessionId = req.params.sessionId;
      const cartItemId = req.params.cartItemId;
      const { quantity } = req.body;
      const item = await cartService.updateItem(sessionId, cartItemId, quantity);
      res.json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const sessionId = req.params.sessionId;
      const cartItemId = req.params.cartItemId;
      const result = await cartService.removeItem(sessionId, cartItemId);
      res.json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const sessionId = req.params.sessionId;
      const result = await cartService.clearCart(sessionId);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

