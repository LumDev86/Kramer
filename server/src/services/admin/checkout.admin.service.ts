import { CheckoutFormRepository } from "@/repositories/CheckoutFormRepository";
import { AppDataSource } from "@/config/dbConfig";
export class AdminCheckoutService {
    async getAllCheckouts(page = 1, limit = 5) {
        const [checkouts, total] = await CheckoutFormRepository.findAndCount({
            order: { createdAt: "DESC" },
            relations: ["cartItems", "cartItems.product"],
            skip: (page - 1) * limit,
            take: limit,
        });

        const data = checkouts.map((checkout) => {
        const items = checkout.cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            product: {
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                image: item.product.image,
            },
        }));

        return {
            id: checkout.id,
            fullName: checkout.fullName,
            phoneNumber: checkout.phoneNumber,
            address: checkout.address,
            paymentMethod: checkout.paymentMethod,
            createdAt: checkout.createdAt,
            items,
        };
        });

        return {
            success: true,
            message: "Checkouts retrieved successfully",
            total,
            page,
            limit,
            data,
        };
    }

    async deleteAllCheckouts() {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
        // 1. Borrar CartItems que están asociados a Checkouts
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from("cart_item")
            .where("checkoutFormId IS NOT NULL")
            .execute();

        // 2. Borrar Checkouts
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from("checkout_form")
            .execute();

        await queryRunner.commitTransaction();

        return {
            success: true,
            message: "All checkouts and related cart items deleted successfully",
        };
        } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new Error("Error deleting checkouts: " + error);
        } finally {
        await queryRunner.release();
        }
    }
}
