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
        name: "User - Products",
        description: "Rutas para productos visibles para usuarios finales",
      },
      {
        name: "User - Categories",
        description: "Rutas para visualizar categorías de productos",
      },
      {
        name: "User - Cart",
        description: "Rutas del carrito de compras del usuario",
      },
      {
        name: "User - Checkout",
        description: "Endpoints relacionados con el proceso de checkout de usuarios",
      },
      {
        name: "User - Promotions",
        description: "Promociones visibles para los usuarios finales",
      },
      {
        name: "Admin - Products",
        description: "Gestión de productos por parte del administrador",
      },
      {
        name: "Admin - Categories",
        description: "Gestión de categorías por parte del administrador",
      },
      {
        name: "Admin - Promotions",
        description: "Gestión de promociones por parte del administrador",
      },
      {
        name: "Admin - Banners",
        description: "Gestión de promociones por parte del administrador",
      },
      {
        name: "CRM",
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
