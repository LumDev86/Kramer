import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { validateOrder } from "../middleware/validateOrder";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get("/", orderController.getAll);
orderRouter.post("/", [].concat(validateOrder as any), orderController.create);
orderRouter.delete("/:id", orderController.delete);

export default orderRouter;
