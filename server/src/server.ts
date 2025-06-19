import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routers/indexRoutes";
import dotenv from "dotenv";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const server = express();
setupSwagger(server);

// Middlewares
server.use(cors()); // Habilita CORS para todas las solicitudes
server.use(morgan("dev")); // Muestra logs de las peticiones en consola
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", router);

export default server;
