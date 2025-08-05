// src/repositories/BannerRepository.ts
import { AppDataSource } from "@/config/dbConfig";
import { Banner } from "@/entities/Banner";

export const BannerRepository = AppDataSource.getRepository(Banner);
