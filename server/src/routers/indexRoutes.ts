import { Router } from "express";
import userProductRouter from "@/routers/user/product.user.routes";
import userCategoryRouter from "@/routers/user/category.user.routes";
// import adminProductRouter from "@/routers/admin/product.admin.routes";
// import adminCategoryRouter from "@/routers/admin/category.admin.routes";
import cartRouter from "@/routers/user/cart.user.routes";

const router = Router();

router.use("/cart", cartRouter);


// Rutas para usuarios finales
router.use("/user/categories", userCategoryRouter);
router.use("/user/products", userProductRouter);

// Rutas para admins
// router.use("/admin/categories", adminCategoryRouter);
// router.use("/admin/products", adminProductRouter);

export default router;