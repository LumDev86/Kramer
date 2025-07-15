import { Repository } from "typeorm";
import { CartItem } from "@entities/CartItem";
import { AppDataSource } from "@config/dbConfig";

export const CartItemRepository: Repository<CartItem> = AppDataSource.getRepository(CartItem);
