import { Router } from "express";
import { ProductController } from "@/controllers/user/product.user.controller";
import { ProductService } from "@/services/user/product.user.service";

const adminProductRouter = Router();
const productController = new ProductController();

adminProductRouter.post("/", ProductService.uploadImage ,productController.create);
adminProductRouter.put("/:id", ProductService.uploadImage, productController.update);
adminProductRouter.delete("/:id", productController.delete);

export default adminProductRouter;

