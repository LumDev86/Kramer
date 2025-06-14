import { Router } from "express";
import { CartController } from "../controllers/cartController";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.get("/:sessionId", cartController.getItems.bind(cartController));
cartRouter.post("/:sessionId/items", cartController.addItem.bind(cartController));
cartRouter.put("/:sessionId/items/:cartItemId", cartController.updateItem.bind(cartController));
cartRouter.delete("/:sessionId/items/:cartItemId", cartController.removeItem.bind(cartController));
cartRouter.delete("/:sessionId", cartController.clearCart.bind(cartController));

export default cartRouter;
