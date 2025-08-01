import cors from "cors";
import { config } from "@config/validateEnv";

const allowedOrigins = [
  config.HOST_SERVER_LOCAL,
  config.PORT_SERVER_PRODUCTION,
  config.HOST_PIXIAN,
  config.HOST_FRONT_LOCAL,
  config.HOST_VERCEL,
];

export const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy does not allow this origin"));
    }
  },
  credentials: true,
};
