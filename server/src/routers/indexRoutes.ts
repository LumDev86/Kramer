import { Router } from "express";
import productRouter from "./productRoutes";
import categoryRouter from "./categoryRoutes";
import cartRouter from "./cartRoutes";

const router = Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/cart", cartRouter);

export default router;