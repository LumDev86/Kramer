import { Repository } from "typeorm";
import { AppDataSource } from "@config/dbConfig"; 
import { User } from "@entities/User";

export const UserRepository: Repository<User> = AppDataSource.getRepository(User);
