export interface OrderDto {
    name: string;
    phoneNumber: string;
    paymentMethod: "Efectivo" | "MercadoPago";
    address: string;
    email?: string;
    products: string[]; // IDs de los productos
}
