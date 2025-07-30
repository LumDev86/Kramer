import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "@config/validateEnv";
import router from "@routes/indexRoutes";
import dotenv from "dotenv";
import { setupSwagger } from "@config/swagger";

dotenv.config();

const server = express();
setupSwagger(server);



const allowedOrigins = [
    config.HOST_SERVER_LOCAL,
    config.PORT_SERVER_PRODUCTION,
    config.HOST_PIXIAN,
    config.HOST_FRONT_LOCAL,
    config.HOST_VERCEL,
];

const corsOptions: cors.CorsOptions = {
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

// Middlewares
server.use(cors(corsOptions));
server.use(morgan("dev")); // Muestra logs de las peticiones en consola
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", router);

export default server;
