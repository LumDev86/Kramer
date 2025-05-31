import { Repository } from "typeorm";
import { AppDataSource } from "../config/dbConfig";
import { Order } from "../entities/Order";

export const OrderRepository: Repository<Order> = AppDataSource.getRepository(Order);