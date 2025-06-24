import { Repository } from "typeorm";
import { AppDataSource } from "../config/dbConfig"; 
import { Promotion } from "../entities/Promotion";

export const PromotionRepository: Repository<Promotion> = AppDataSource.getRepository(Promotion);