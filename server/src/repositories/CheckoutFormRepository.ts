import { Repository } from "typeorm";
import { CheckoutForm } from "@/entities/CheckoutForm";
import { AppDataSource } from "@config/dbConfig";

export const CheckoutFormRepository: Repository<CheckoutForm> = AppDataSource.getRepository(CheckoutForm);