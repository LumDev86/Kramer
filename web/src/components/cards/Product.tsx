import { useState } from "react";
import { ProductProps } from "../../interfaces/product";
import { useCart } from "../../hooks/useCart";
import { useAddProductToCart } from "../../hooks/useAddProductToCart";
import { toast } from "sonner";

export const Product = ({ product }: ProductProps) => {
  const { addToCart } = useCart();
  const { mutate, isPending } = useAddProductToCart();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddToCart = () => {
    if (isButtonDisabled) return;

    mutate(
      { id: product.id, quantity: 1 },
      {
        onSuccess: (data) => {
          const { id, product, quantity } = data;
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image ?? undefined,
            quantity,
            cartItemId: id
          });

          toast.success("Producto agregado al carrito ✅");
          setIsButtonDisabled(true);
        },
        onError: () => {
          toast.error("Error al agregar al carrito ❌");
        },
      }
    )
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
        disabled={isButtonDisabled || isPending}
        className={`mt-3 w-full px-4 py-1 rounded 
          ${isButtonDisabled || isPending ? "bg-gray-400" : "bg-green-500 hover:bg-green-600 text-white"}`}
      >
        {isPending ? "Agregando..." : "Agregar al carrito"}
      </button>
    </div>
  );
};
