/*import { OrderRepository } from "../repositories/OrderRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { OrderDto } from "../dto/OrderDto";
import { In } from "typeorm";
import { sendWhatsAppMessage } from "./whatsappService";

export class OrderService {
    async getAll(limit: number, page: number) {
        try {
            const [orders, total] = await OrderRepository.findAndCount({
                relations: ["products"],
                take: limit,
                skip: (page - 1) * limit
            });
            return { total, page, totalPages: Math.ceil(total / limit), orders };
        } catch (error) {
            throw new Error("Error al obtener las órdenes.");
        }
    }

    async create(data: OrderDto) {
        try {
            if (!data.name || data.name.trim() === "") {
                throw new Error("El nombre del cliente es obligatorio.");
            }
            if (!data.phoneNumber || data.phoneNumber.trim() === "") {
                throw new Error("El número de teléfono es obligatorio.");
            }
            if (!data.paymentMethod) {
                throw new Error("Debe seleccionar un método de pago.");
            }
            if (!data.products || data.products.length === 0) {
                throw new Error("Debe agregar al menos un producto a la orden.");
            }
    
            // Buscar productos por sus IDs
            const products = await ProductRepository.findBy({
                id: In(data.products),
            });
            if (products.length !== data.products.length) {
                throw new Error("Algunos productos no existen.");
            }
    
            const total = products.reduce((sum, product) => sum + Number(product.price), 0);
    
            const order = OrderRepository.create({ 
                name: data.name, 
                phoneNumber: data.phoneNumber, 
                paymentMethod: data.paymentMethod,
                address: data.address,
                email: data.email ?? undefined, 
                products, 
                total 
            });
    
            const savedOrder = await OrderRepository.save(order);
    
            // Enviar mensaje por WhatsApp
            await this.sendWhatsAppMessage(savedOrder);
    
            return savedOrder;
        } catch (error) {
            throw new Error("Error al crear la orden.");
        }
    }

    async sendWhatsAppMessage(order: any) {
        try {
            const phoneNumber = order.phoneNumber;
            const message = `Hola ${order.name}, tu pedido ha sido confirmado.\n\n` +
                `📍 Dirección: ${order.address}\n` +
                `📞 Contacto: ${order.phoneNumber}\n\n` +
                `🛒 Productos:\n` +
                order.products.map((p: any) => `- ${p.name}: $${p.price}`).join("\n") +
                `\n\n💰 Total: $${order.total}\n` +
                `💳 Método de pago: ${order.paymentMethod}\n\n` +
                `¡Gracias por tu compra!`;
    
            await sendWhatsAppMessage(phoneNumber, message);
        } catch (error) {
            console.error("Error al enviar el mensaje de WhatsApp", error);
        }
    }

    async delete(id: string) {
        try {
            const order = await OrderRepository.findOne({ where: { id } });
            if (!order) {
                throw new Error("Orden no encontrada.");
            }
            await OrderRepository.remove(order);
            return { message: "Orden eliminada correctamente." };
        } catch (error) {
            throw new Error("Error al eliminar la orden.");
        }
    }    
}
*/
/*import { OrderRepository } from "../repositories/OrderRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { OrderDto } from "../dto/OrderDto";
import { In } from "typeorm";
import { sendWhatsAppMessage } from "./whatsappService";

export class OrderService {
    async getAll(limit: number, page: number) {
        try {
            const [orders, total] = await OrderRepository.findAndCount({
                relations: ["products"],
                take: limit,
                skip: (page - 1) * limit
            });
            return { total, page, totalPages: Math.ceil(total / limit), orders };
        } catch (error) {
            throw new Error("Error al obtener las órdenes: " + error);
        }
    }

    async create(data: OrderDto) {
        try {
            const products = await ProductRepository.findBy({
                id: In(data.products),
            });

            if (products.length !== data.products.length) {
                throw new Error("Algunos productos no existen.");
            }

            const total = products.reduce((sum, product) => sum + Number(product.price), 0);

            const order = OrderRepository.create({ 
                name: data.name, 
                phoneNumber: data.phoneNumber, 
                paymentMethod: data.paymentMethod,
                address: data.address,
                email: data.email ?? undefined, 
                products, 
                total 
            });

            const savedOrder = await OrderRepository.save(order);

            await this.sendWhatsAppMessage(savedOrder);

            return savedOrder;
        } catch (error) {
            throw new Error("Error al crear la orden: " + error);
        }
    }

    async sendWhatsAppMessage(order: any) {
        try {
            const phoneNumber = order.phoneNumber;
            const message = `Hola ${order.name}, tu pedido ha sido confirmado.\n\n` +
                `📍 Dirección: ${order.address}\n` +
                `📞 Contacto: ${order.phoneNumber}\n\n` +
                `🛒 Productos:\n` +
                order.products.map((p: any) => `- ${p.name}: $${p.price}`).join("\n") +
                `\n\n💰 Total: $${order.total}\n` +
                `💳 Método de pago: ${order.paymentMethod}\n\n` +
                `¡Gracias por tu compra!`;

            await sendWhatsAppMessage(phoneNumber, message);
        } catch (error) {
            console.error("Error al enviar el mensaje de WhatsApp", error);
        }
    }

    async delete(id: string) {
        try {
            const order = await OrderRepository.findOne({ where: { id } });
            if (!order) {
                throw new Error("Orden no encontrada.");
            }
            await OrderRepository.remove(order);
            return { message: "Orden eliminada correctamente." };
        } catch (error) {
            throw new Error("Error al eliminar la orden: " + error);
        }
    }
}
*/
