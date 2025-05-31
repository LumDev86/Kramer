import { Router } from "express";
import { sendMessage, logout, resetSession } from "../controllers/whatsappController";

const wspRouter = Router();

wspRouter.post("/send-message", sendMessage);
wspRouter.post("/logout", logout);
wspRouter.post("/reset-session", resetSession); // Nueva ruta para cambiar de número

export default wspRouter;