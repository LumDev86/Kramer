import { Request, Response } from "express";
import { sendWhatsAppMessage, logoutWhatsApp, resetWhatsAppSession } from "../services/whatsappService";

// Controlador para enviar mensajes
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    res.status(400).json({ success: false, message: "Número de teléfono y mensaje son obligatorios" });
    return;
  }

  const response = await sendWhatsAppMessage(phoneNumber, message);
  res.status(response.success ? 200 : 500).json(response);
};

// Controlador para cerrar sesión
export const logout = async (_req: Request, res: Response) => {
  const response = await logoutWhatsApp();
  res.status(response.success ? 200 : 500).json(response);
};

// Controlador para restablecer sesión (eliminar datos y generar nuevo QR)
export const resetSession = async (_req: Request, res: Response) => {
  const response = await resetWhatsAppSession();
  res.status(response.success ? 200 : 500).json(response);
};


