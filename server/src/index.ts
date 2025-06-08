import server from "./server";
import { AppDataSource } from "./config/dbConfig";

let keepAliveInterval: NodeJS.Timeout | null = null;

const connectWithRetry = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      await AppDataSource.initialize();
      console.log("✅ Database connected successfully");

      server.listen(3000, () => {
        console.log(`🚀 Server is running on port 3000`);
      });

      if (keepAliveInterval) clearInterval(keepAliveInterval);
      startKeepAlivePing();

      break;
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

const startKeepAlivePing = () => {
  keepAliveInterval = setInterval(async () => {
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
  }, 1000 * 60 * 5);
};

connectWithRetry();


