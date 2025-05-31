import { Repository } from "typeorm";
import { AppDataSource } from "../config/dbConfig";
import { Category } from "../entities/Category";

export const CategoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

