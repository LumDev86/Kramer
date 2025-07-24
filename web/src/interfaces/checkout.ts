import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { CheckoutFormSchema } from '../pages/Checkout'
export interface CheckoutProps {
  email: string;
  address: string;
  fullName: string;
  phoneNumber: string;
  paymentMethod: string;
  alias?: string;
  cbu?: string;
  accountHolderName?: string;
}

export type CheckoutSubmit = CheckoutProps & {sessionId: string}; 
// export interface CheckoutProps {
//   total: number;
//   onSubmit: (
//     formData: {
//       name: string;
//       paymentMethod: string;
//       address: string;
//       phone: string
//     },
//   ) => void;
//   goBack: () => void;
// }

export interface CheckoutFormProps {
  register: UseFormRegister<CheckoutFormSchema>
  errors: FieldErrors<CheckoutFormSchema>
  paymentMethod: string
}