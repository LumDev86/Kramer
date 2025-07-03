// src/config/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { config } from "./validateEnv";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce Kramer API",
      version: "1.0.0",
      description: "API documentation for the E-Commerce project",
    },
    servers: [
      {
        url: config.PORT_SERVER_PRODUCTION,
        description: "Production server",
      },
      {
        url: config.HOST_SERVER_LOCAL,
        description: "Local server",
      },
    ],
  },
  apis: [
    "./src/routers/**/*.ts",
    "./src/controllers/**/*.ts",
    "./src/dto/*.ts"
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
