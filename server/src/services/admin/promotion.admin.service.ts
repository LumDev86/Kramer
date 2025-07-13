import { PromotionRepository } from "@/repositories/PromotionRepository";
import { ProductRepository } from "@/repositories/ProductRepository";
import { Promotion } from "@/entities/Promotion";

export class PromotionAdminService {
    async create(data: any) {
        const { title, description, type, data: ruleData, productIds } = data;

        const products = await ProductRepository.findByIds(productIds || []);

        const promotion = PromotionRepository.create({
        title,
        description,
        type,
        data: ruleData,
        products,
        });

        return await PromotionRepository.save(promotion);
    }

    async update(id: string, data: any) {
        const promotion = await PromotionRepository.findOne({ where: { id } });
        if (!promotion) throw new Error("Promoción no encontrada.");

        if (data.productIds) {
        const products = await ProductRepository.findByIds(data.productIds);
        promotion.products = products;
        }

        Object.assign(promotion, data);

        return await PromotionRepository.save(promotion);
    }

    async delete(id: string) {
        const promotion = await PromotionRepository.findOne({ where: { id } });
        if (!promotion) throw new Error("Promoción no encontrada.");
        await PromotionRepository.remove(promotion);
        return { message: "Promoción eliminada exitosamente." };
    }
}
