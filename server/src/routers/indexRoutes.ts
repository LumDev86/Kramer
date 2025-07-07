import { Router } from "express";
import userProductRouter from "@/routers/userClient/product.user.routes";
import userCategoryRouter from "@/routers/userClient/category.user.routes";
// import adminProductRouter from "@/routers/admin/product.admin.routes";
// import adminCategoryRouter from "@/routers/admin/category.admin.routes";
import cartRouter from "@/routers/userClient/cart.user.routes";
import checkoutRouter from "@/routers/userClient/checkout.user.routes";

const router = Router();



// Rutas para usuarios finales
router.use("/user/cart", cartRouter);
router.use("/user/categories", userCategoryRouter);
router.use("/user/products", userProductRouter);
router.use("/user/checkout", checkoutRouter); // Assuming checkout is handled in the cart routes

// Rutas para admins
// router.use("/admin/categories", adminCategoryRouter);
// router.use("/admin/products", adminProductRouter);

export default router;