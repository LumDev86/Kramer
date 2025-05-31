import { Router } from "express";
import productRouter from "./productRoutes";
import wspRouter from "./whatsappRoutes";
import categoryRouter from "./categoryRoutes";
import orderRouter from "./orderRoutes";

const router = Router();

router.use("/products", productRouter);
router.use("/whatsapp", wspRouter);
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);

export default router;