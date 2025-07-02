import { useState } from "react";
import { ProductProps } from "../../interfaces/product";
import { useCart } from "../../hooks/useCart";
import { toast } from "sonner";

export const Product = ({ product }: ProductProps) => {
  const { addToCart } = useCart(); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddToCart = () => {
    if (isButtonDisabled) return;
  
    addToCart({ ...product, quantity: 1 }); 
    toast.success("Producto agregado al carrito ✅");
    setIsButtonDisabled(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={product.image} alt={product.name} />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-700 font-bold">${product.price}</p>
      <p className="text-gray-500">Marca: {product.brand}</p>
      <p className="text-gray-500">Peso: {product.weight}</p>
      <button 
        onClick={handleAddToCart} 
        disabled={isButtonDisabled} 
        className={`mt-3 w-full px-4 py-1 rounded 
        ${isButtonDisabled ? "bg-gray-400" : "bg-green-500 hover:bg-green-600 text-white"}`}>
        Agregar al carrito
      </button>
    </div>
  );
};
