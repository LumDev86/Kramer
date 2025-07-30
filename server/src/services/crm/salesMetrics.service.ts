import { CheckoutFormRepository } from "@/repositories/CheckoutFormRepository";
import { CartItemRepository } from "@/repositories/CartItemRepository";
import { getArgentinaDayRange } from "@/utils/date.utils";
import moment from "moment-timezone";

export class SalesMetricsService {
    checkoutRepo = CheckoutFormRepository;
    cartItemRepo = CartItemRepository;

    async getDailySales() {
        const { start, end } = getArgentinaDayRange();

        return this.getSalesBetween(start, end);
    }

    async getWeeklySales() {
        const end = moment().toDate();
        const start = moment().subtract(7, "days").startOf("day").toDate();

        return this.getSalesBetween(start, end);
    }

    async getMonthlySales() {
        const end = moment().toDate();
        const start = moment().startOf("month").toDate();

        return this.getSalesBetween(start, end);
    }

    private async getSalesBetween(start: Date, end: Date) {
        const result = await this.cartItemRepo
            .createQueryBuilder("cartItem")
            .innerJoin("cartItem.checkoutForm", "checkout")
            .innerJoin("cartItem.product", "product")
            .select("SUM(product.price * cartItem.quantity)", "totalSales")
            .addSelect("COUNT(DISTINCT checkout.id)", "totalOrders")
            .where("checkout.createdAt >= :start AND checkout.createdAt < :end", { start, end })
            .getRawOne();

        const totalSales = Number(result?.totalSales || 0);
        const totalOrders = Number(result?.totalOrders || 0);

        if (totalOrders === 0) {
            return {};
        }

        return {
            totalSales,
            totalOrders,
            startDate: start,
            endDate: end
        };
    }
}



