import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get("/", categoryController.getAll);
categoryRouter.get("/:name/products", categoryController.getProductsByCategoryName);
categoryRouter.get("/:id", categoryController.getById);
categoryRouter.post("/", categoryController.create);
categoryRouter.put("/:id", categoryController.update);
categoryRouter.delete("/:id", categoryController.delete);

export default categoryRouter;