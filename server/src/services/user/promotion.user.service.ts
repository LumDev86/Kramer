import { Promotion } from "@/entities/Promotion";
import { PromotionRepository } from "@/repositories/PromotionRepository";

export class PromotionService {
    async getAll() {
        const promotions = await PromotionRepository.find({
        relations: ["products"],
        order: { title: "ASC" },
        });
        return promotions;
    }

    async getById(id: string) {
        const promotion = await PromotionRepository.findOne({
        where: { id },
        relations: ["products"],
        });
    
        if (!promotion) throw new Error("Promoción no encontrada.");
    
        return promotion;
    }
}
