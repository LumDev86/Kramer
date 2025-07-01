import { Router } from "express";
import userProductRouter from "@/routers/user/userProductRoutes";
import userCategoryRouter from "@/routers/user/userCategoryRoutes";
import adminProductRouter from "@/routers/admin/adminProductRoutes";
import adminCategoryRouter from "@/routers/admin/adminCategoryRoutes";
import cartRouter from "@routes/cart/cartRoutes";

const router = Router();

router.use("/cart", cartRouter);


// Rutas para usuarios finales
router.use("/user/categories", userCategoryRouter);
router.use("/user/products", userProductRouter);

// Rutas para admins
router.use("/admin/categories", adminCategoryRouter);
router.use("/admin/products", adminProductRouter);

export default router;