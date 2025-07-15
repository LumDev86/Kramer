import { Router } from "express";
import   AuthController   from "@/controllers/admin/auth.admin.controller";

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Admin - Auth
 *   description: Autenticación de administradores
 */

authRouter.post("/login", AuthController.login);


authRouter.post("/register", AuthController.register);


authRouter.patch("/updatePassword", AuthController.updatePassword);


export default authRouter;  