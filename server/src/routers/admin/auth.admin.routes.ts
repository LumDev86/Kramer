import { Router } from "express";
import   AuthController   from "@/controllers/admin/auth.admin.controller";
import { RegisterSchema, LoginSchema } from "@/validations/auth.validation";
import  schemaValidator  from "@middlewares/globalValidate";

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Admin - Autenticación
 *   description: Autenticación de administradores
 */

/**
 * @swagger
 * /api/admin/auth/login:
 *   post:
 *     summary: Iniciar sesión como administrador
 *     tags: [Admin - Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Autenticación exitosa. Devuelve el token JWT.
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */
authRouter.post(
    "/login", 
    AuthController.login
);


/**
 * @swagger
 * /api/admin/auth/register:
 *   post:
 *     summary: Registrar un nuevo administrador
 *     tags: [Admin - Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: Administrador registrado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
authRouter.post(
    "/register", 
    schemaValidator(RegisterSchema, null),
    AuthController.register
);



/**
 * @swagger
 * /api/admin/auth/updatePassword:
 *   patch:
 *     summary: Actualizar contraseña del administrador
 *     tags: [Admin - Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
authRouter.patch(
    "/updatePassword", 
    schemaValidator(LoginSchema, null), 
    AuthController.updatePassword
);


export default authRouter;  