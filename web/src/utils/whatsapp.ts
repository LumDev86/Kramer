import { CheckoutSubmit } from "../interfaces/checkout";
import { CartContextType } from "../interfaces/cart";

const WHATSAPP_NUMBER = "5491125677573"; // Cambiar por el número del negocio

export const generateWhatsAppLink = (data: CheckoutSubmit, cart: CartContextType) => {
  // Convertir precios de forma segura (string o number)
  const productsList = cart.cart.map((item) => {
    const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
    const subtotal = (price * item.quantity).toFixed(2);
    return `• ${item.name} x${item.quantity} = $${subtotal}`;
  }).join("\n");

  // Total final (incluye el envío de $1.99 si aplica)
  const totalFinal = (cart.total + 1.99).toFixed(2);

  const message = `¡Nueva compra realizada! 🛒

Cliente:
- Nombre: ${data.fullName}
- Email: ${data.email}
- Teléfono: ${data.phoneNumber ?? "No especificado"}

Método de pago: ${data.paymentMethod}

Productos:
${productsList}

Total (con envío): $${totalFinal} ARS

Por favor, confirma el pedido.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const sendCheckoutToWhatsApp = (data: CheckoutSubmit, cart: CartContextType) => {
  const url = generateWhatsAppLink(data, cart);
  window.open(url, "_blank");
};

