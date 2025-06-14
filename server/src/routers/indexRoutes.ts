import { Router } from "express";
import productRouter from "./productRoutes";
import categoryRouter from "./categoryRoutes";

const router = Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);

export default router;