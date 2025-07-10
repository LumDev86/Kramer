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
    tags: [
      {
        name: "User - Products || Ruta base: /api/products",
        description: "Rutas para productos visibles para usuarios finales",
      },
      {
        name: "User - Categories || Ruta base: /api/categories",
        description: "Rutas para visualizar categorías de productos",
      },
      {
        name: "User - Cart || Ruta base: /api/cart",
        description: "Rutas del carrito de compras del usuario",
      },
      {
        name: "User - Checkout || Ruta base: /api/checkout",
        description: "Endpoints relacionados con el proceso de checkout de usuarios",
      },
      {
        name: "Admin || Ruta base: /api/admin",
        description: "Rutas para el panel administrativo",
      },
      {
        name: "CRM || Ruta base: /api/crm",
        description: "Rutas para gestión de clientes, ventas y otras áreas del CRM",
      },
    ],
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
