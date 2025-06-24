/*import React, { useState } from "react";
import { CheckoutFormProps } from "../interfaces/interfaces";

const CheckoutForm: React.FC<CheckoutFormProps> = ({ total, onSubmit, goBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    paymentMethod: "efectivo",
    address: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Datos de Envío</h2>
      <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Nombre y Apellido"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="efectivo">Efectivo</option>
          <option value="mercado_pago">Mercado Pago</option>
        </select>
        {formData.paymentMethod === "mercado_pago" && (
          <div className="p-2 bg-gray-100 rounded">
            <p><strong>Alias:</strong> alias.mp</p>
            <p><strong>Titular:</strong> Juan Pérez</p>
            <p><strong>CVU:</strong> 0000003100055555555555</p>
          </div>
        )}
        <input
          type="text"
          name="address"
          placeholder="Domicilio"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Número de Teléfono"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Confirmar Compra
        </button>
      </form>
      <button onClick={goBack} className="mt-3 text-blue-500 underline">Volver</button>
    </div>
  );
};

export default CheckoutForm;*/