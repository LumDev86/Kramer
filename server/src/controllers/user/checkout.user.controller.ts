import { Request, Response } from "express";
import { CheckoutService } from "@/services/user/checkout.user.service";
import { CreateCheckoutDto } from "@/dto/CheckoutDto";

const checkoutService = new CheckoutService();

export class CheckoutController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const dto: CreateCheckoutDto = req.body;
      const result = await checkoutService.createCheckout(dto);
      return res.status(201).json(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(400).json({ error: message });
    }
  }
}

