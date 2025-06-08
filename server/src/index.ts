import server from "./server";
import { AppDataSource } from "./config/dbConfig";

// Función para intentar reconexión automática si falla
const connectWithRetry = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      await AppDataSource.initialize();
      console.log("✅ Database connected successfully");

      // Iniciar el servidor Express
      server.listen(3000, () => {
        console.log(`🚀 Server is running on port 3000`);
      });

      // Iniciar keep-alive ping cada 5 minutos
      startKeepAlivePing();

      break; // salimos del bucle si se conecta exitosamente
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Failed to connect to the database:", error.message);
      } else {
        console.error("❌ Unknown error during DB connection:", error);
      }

      retries--;

      if (retries === 0) {
        console.error("💥 Could not connect to DB after several retries");
        process.exit(1);
      }

      console.log(`🔁 Retrying in ${delay / 1000} seconds...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

// Función para mantener viva la conexión
const startKeepAlivePing = () => {
  setInterval(async () => {
    try {
      await AppDataSource.query("SELECT 1");
      console.log("🔁 Keep-alive ping sent to the database");
    } catch (err) {
      if (err instanceof Error) {
        console.warn("⚠️ Keep-alive ping failed:", err.message);
      } else {
        console.warn("⚠️ Unknown error during keep-alive ping:", err);
      }
    }
  }, 1000 * 60 * 5); // cada 5 minutos
};

// Iniciar todo
connectWithRetry();

