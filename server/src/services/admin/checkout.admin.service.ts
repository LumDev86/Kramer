import { CheckoutFormRepository } from "@/repositories/CheckoutFormRepository";

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
        await CheckoutFormRepository.clear();
        return {
            success: true,
            message: "All checkouts deleted successfully",
        };
    }
}
