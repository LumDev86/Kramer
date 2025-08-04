import { PromotionRepository } from "@/repositories/PromotionRepository";

export class PromotionService {
    async getAll(page = 1, limit = 10) {
        const [promotions, total] = await PromotionRepository.findAndCount({
            relations: ["products"],
            order: { title: "ASC" },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            promotions,
        };
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
