import server from "./server";
import { AppDataSource } from "./config/dbConfig";

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully");

    server.listen(3000, () => {
      console.log(`✅ Port running in port 3000`);
    });
  })
  .catch((error) => {
    console.error("💥 Error during Data Source initialization:", error);
  });