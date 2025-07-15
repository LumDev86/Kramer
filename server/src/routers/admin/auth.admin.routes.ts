import { Router } from "express";
import   AuthController   from "@/controllers/admin/auth.admin.controller";
import { RegisterSchema, LoginSchema } from "@/validations/auth.validation";
import  schemaValidator  from "@middlewares/globalValidate";

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Admin - Auth
 *   description: Autenticación de administradores
 */

authRouter.post("/login", AuthController.login);


authRouter.post("/register", schemaValidator(RegisterSchema, null),AuthController.register);


authRouter.patch("/updatePassword", schemaValidator(LoginSchema, null), AuthController.updatePassword);


export default authRouter;  