import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./validateEnv";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { Order } from "../entities/Order";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.HOST_NAME_DATABASE,
  port: config.PORT_DATABASE, // Usar puerto dinámico
  username: config.USER_NAME_DATABASE,
  password: config.PASSWORD_DATABASE,
  database: config.NAME_DATABASE,
  synchronize: false,
  logging: true,
  entities: [Category, Product, Order],
});
