import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./validateEnv";
import { Category } from "@entities/Category";
import { Product } from "@entities/Product";
import { CartItem } from "@entities/CartItem";
import { Promotion } from "@entities/Promotion"; // Importa la entidad Promotion si es necesario

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.HOST_NAME_DATABASE,
  port: config.PORT_DATABASE, 
  username: config.USER_NAME_DATABASE,
  password: config.PASSWORD_DATABASE,
  database: config.NAME_DATABASE,
  synchronize: true,
  dropSchema: false, // Cambia a false en producción
  logging: true,
  entities: [Category, Product, CartItem, Promotion],
});
