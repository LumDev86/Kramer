import { Router } from "express";
import { ProductController } from "../controllers/productController";
//import { upload } from "../utils/awsS3";
import { validateProduct } from "../middleware/validateProduct";

const productRouter = Router();
const productController = new ProductController();

productRouter.get("/", productController.getAll);
productRouter.get("/:id", productController.getById);
productRouter.post("/", productController.create);
productRouter.put("/:id", productController.update);
productRouter.get("/category/:category", productController.getByCategory);
productRouter.delete("/:id", productController.delete);

export default productRouter;
