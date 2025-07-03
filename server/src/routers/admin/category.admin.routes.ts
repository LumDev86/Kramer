import { Router } from "express";
import { CategoryController } from "@/controllers/user/category.user.controller";

const adminCategoryRouter = Router();
const categoryController = new CategoryController();

adminCategoryRouter.post("/", categoryController.create);
adminCategoryRouter.put("/:id", categoryController.update);

export default adminCategoryRouter;

