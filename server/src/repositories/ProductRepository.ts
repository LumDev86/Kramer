import { Repository } from "typeorm";
import { AppDataSource } from "@config/dbConfig"; 
import { Product } from "@entities/Product";

export const ProductRepository: Repository<Product> = AppDataSource.getRepository(Product);
