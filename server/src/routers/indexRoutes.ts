import { Router } from "express";
import userProductRouter from "@/routers/userClient/product.user.routes";
import userCategoryRouter from "@/routers/userClient/category.user.routes";
import adminProductRouter from "@/routers/admin/product.admin.routes";
import adminCategoryRouter from "@/routers/admin/category.admin.routes";
import cartRouter from "@/routers/userClient/cart.user.routes";
import checkoutRouter from "@/routers/userClient/checkout.user.routes";
import userPromotionRouter from "@/routers/userClient/promotion.routes";
import adminPromotionRouter from "@/routers/admin/promotion.admin.routes";
import authRouter from "@/routers/admin/auth.admin.routes";
import salesMetricsRouter from "@/routers/crm/salesMetrics.routes";
import adminCheckoutRouter from "./admin/checkout.admin.route";
import adminBannerRouter from "@/routers/admin/banner.admin.routes";

const router = Router();

// Rutas para usuarios finales
router.use("/user/cart", cartRouter);
router.use("/user/categories", userCategoryRouter);
router.use("/user/products", userProductRouter);
router.use("/user/checkout", checkoutRouter); 
router.use("/user/promotions", userPromotionRouter); 

// Rutas para admins
router.use("/admin/categories", adminCategoryRouter);
router.use("/admin/products", adminProductRouter);
router.use("/admin/promotions", adminPromotionRouter);
router.use("/admin/auth", authRouter);
router.use("/admin/checkout", adminCheckoutRouter); 
router.use("/admin/banners", adminBannerRouter);

// Rutas para CRM
router.use("/crm/sales", salesMetricsRouter);

export default router;