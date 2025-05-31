import fs from "fs";
import path from "path";
import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

// Ruta controlada donde se almacenan las sesiones
const SESSION_DIR = path.join(__dirname, "..", "..", "sessions");

let client = new Client({
  authStrategy: new LocalAuth({ dataPath: SESSION_DIR }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  console.log("📌 Escanea este código QR para iniciar sesión en WhatsApp:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ Cliente de WhatsApp está listo!");
});

client.initialize();

// Función para enviar mensajes
export const sendWhatsAppMessage = async (phoneNumber: string, message: string) => {
  try {
    if (!client.info) throw new Error("El cliente de WhatsApp no está listo.");

    const chatId = phoneNumber.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`;
    await client.sendMessage(chatId, message);
    console.log(`📨 Mensaje enviado a ${phoneNumber}`);
    return { success: true, message: "Mensaje enviado correctamente" };
  } catch (error) {
    console.error("❌ Error al enviar mensaje:", error);
    return { success: false, message: "Error al enviar el mensaje" };
  }
};

// Función para cerrar sesión
export const logoutWhatsApp = async () => {
  try {
    await client.logout();
    console.log("🚪 Sesión de WhatsApp cerrada.");
    return { success: true, message: "Sesión cerrada correctamente" };
  } catch (error) {
    console.error("❌ Error al cerrar sesión:", error);
    return { success: false, message: "Error al cerrar la sesión" };
  }
};

// Función para restablecer sesión (eliminar sesión vieja y generar nuevo QR)
export const resetWhatsAppSession = async () => {
  try {
    await client.destroy(); // Destruye el cliente actual

    if (fs.existsSync(SESSION_DIR)) {
      fs.rmSync(SESSION_DIR, { recursive: true, force: true });
    }

    console.log("🔄 Sesión eliminada. Reiniciando WhatsApp con un nuevo QR...");

    client = new Client({
      authStrategy: new LocalAuth({ dataPath: SESSION_DIR }),
      puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    });

    client.on("qr", (qr) => {
      console.log("📌 Escanea este código QR para iniciar sesión con un nuevo número:");
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("✅ Nuevo número registrado y listo para usar!");
    });

    client.initialize();

    return { success: true, message: "Sesión restablecida. Escanea el nuevo QR." };
  } catch (error) {
    console.error("❌ Error al restablecer la sesión:", error);
    return { success: false, message: "Error al restablecer la sesión" };
  }
};

// (Opcional) Función para limpiar sesiones viejas
export const cleanOldSessions = () => {
  const maxAge = 1000 * 60 * 60 * 24; // 24 horas
  if (fs.existsSync(SESSION_DIR)) {
    fs.readdirSync(SESSION_DIR).forEach(file => {
      const filePath = path.join(SESSION_DIR, file);
      const stats = fs.statSync(filePath);
      if (Date.now() - stats.mtimeMs > maxAge) {
        fs.rmSync(filePath, { recursive: true, force: true });
        console.log(`🧹 Sesión eliminada: ${file}`);
      }
    });
  }
};


