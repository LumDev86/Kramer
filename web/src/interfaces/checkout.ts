export interface CheckoutProps {
  email: string;
  address: string;
  fullName: string;
  phone: number;
  paymentMethod: string;
  alias?: string;
  cvu?: string;
  titular?: string;
}

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
