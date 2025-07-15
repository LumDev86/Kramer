import { PaymentMethod } from "@/enums/PaymentMethod";

export interface CreateCheckoutDto {
  fullName: string;
  phoneNumber: string;
  address: string;
  paymentMethod: PaymentMethod;
  sessionId: string;
  // Solo si paymentMethod === "mercado_pago"
  cbu?: string;
  alias?: string;
  accountHolderName?: string;
}
