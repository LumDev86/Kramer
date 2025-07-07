// src/controllers/user/checkout.user.controller.ts
import { Request, Response } from "express";
import { CheckoutService } from "@/services/user/checkout.user.service";
import { CreateCheckoutDto } from "@/dto/CheckoutDto";

const checkoutService = new CheckoutService();

export class CheckoutController {
  async create(req: Request, res: Response) {
    try {
      const dto: CreateCheckoutDto = req.body;
      const result = await checkoutService.createCheckout(dto);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
