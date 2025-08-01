import { Request, Response } from "express";
import { CartService } from "@/services/user/cart.user.service";
import { extractMessage } from "@/utils/HttpError.utils";

const cartService = new CartService();

export class CartController {
  async getItems(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;
      const data = await cartService.getCartItems(sessionId);
      return res.json(data);
    } catch (err) {
      return res.status(500).json({ error: extractMessage(err) });
    }
  }

  async addItem(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;
      const { productId, quantity } = req.body;
      const item = await cartService.addItem(sessionId, productId, quantity);
      return res.status(201).json(item);
    } catch (err) {
      return res.status(400).json({ error: extractMessage(err) });
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const { sessionId, cartItemId } = req.params;
      const { quantity } = req.body;
      const item = await cartService.updateItem(sessionId, cartItemId, quantity);
      return res.json(item);
    } catch (err) {
      return res.status(400).json({ error: extractMessage(err) });
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const { sessionId, cartItemId } = req.params;
      const result = await cartService.removeItem(sessionId, cartItemId);
      return res.json(result);
    } catch (err) {
      return res.status(404).json({ error: extractMessage(err) });
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;
      const result = await cartService.clearCart(sessionId);
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ error: extractMessage(err) });
    }
  }
}




