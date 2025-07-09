import { ProductProps } from "../../interfaces/product";
import { useCart } from "../../hooks/useCart";
import { useAddProductToCart } from "../../hooks/useAddProductToCart";
import { toast } from "sonner";
import { ShoppingCart, SquareCheck } from "lucide-react";

export const Product = ({ product }: ProductProps) => {
  const { addToCart } = useCart();
  const { mutate, isPending } = useAddProductToCart();

  const handleAddToCart = () => {
    mutate(
      { id: product.id, quantity: 1 },
      {
        onSuccess: (data) => {
          const { id, product, quantity } = data;
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
            cartItemId: id
          });

          toast.success("Producto agregado al carrito ✅");
        },
        onError: () => {
          toast.error("Error al agregar al carrito ❌");
        },
      }
    )
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="bg-[#6EC3F64D] rounded-2xl cursor-pointer">
        <img src={product.image} alt={product.name} className="h-28 object-contain mx-auto p-1" />
      </div>
      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-2xl font-medium">${product.price}</p>
      <button
        onClick={handleAddToCart}
        disabled={isPending}
        className={`flex items-center justify-center gap-2 text-sm rounded-full py-2 
        ${isPending ? "bg-[#C6F3C4] text-[#A0A0A0]" : "bg-[#8de68a] hover:bg-green-60"}`}>
        {
          isPending ? (
            <>
              <SquareCheck stroke="none" size={18} /> Agregado
            </>
          ) : (
            <>
              <ShoppingCart fill="currentColor" size={18} /> Agregar
            </>
          )
        } 
      </button>
    </div>
  );
};
