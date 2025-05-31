import { useState } from 'react';
import { ProductProps } from '../interfaces/interfaces';
import { useCart } from '../context/CartContext'; // Importamos el contexto del carrito

export function ProductCard({ product }: ProductProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { addToCart } = useCart(); // Obtenemos la función para agregar productos al carrito

  const handleAddToCart = () => {
    if (isButtonDisabled) return;
  
    addToCart({ ...product, quantity: 1 }); // Agregar la propiedad 'quantity'
    setShowPopup(true);
    setIsButtonDisabled(true);
  
    setTimeout(() => {
      setShowPopup(false);
      setIsButtonDisabled(false);
    }, 3000); // Ocultar el popup después de 3 segundos
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-700 font-bold">${product.price}</p>
      <p className="text-gray-500">Marca: {product.brand}</p>
      <p className="text-gray-500">Peso: {product.weight}</p>

      <button 
        onClick={handleAddToCart} 
        disabled={isButtonDisabled} 
        className={`mt-3 w-full px-4 py-1 rounded ${
          isButtonDisabled ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        Agregar al carrito
      </button>

      {showPopup && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm p-3 rounded-lg shadow-lg z-50 w-4/5 text-center">
          Producto agregado al carrito ✅
        </div>
      )}
    </div>
  );
}








