export interface CheckoutProps {
  total: number;
  onSubmit: (
    formData: { 
      name: string; 
      paymentMethod: string; 
      address: string; 
      phone: string 
    },
  ) => void;
  goBack: () => void;
}
