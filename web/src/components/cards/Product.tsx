import { ProductProps } from "../../interfaces/product";
import { useCart } from "../../hooks/useCart";
import { useAddProductToCart } from "../../hooks/useAddProductToCart";
import { toast } from "sonner";
import { ShoppingCart, Check } from "lucide-react";

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
    <div className="font-outfit gap-3 flex flex-col">
      <div className="bg-[#6EC3F64D] h-[134px] relative rounded-lg cursor-pointer flex flex-col 
      justify-center items-center font-outfit gap-3">
        <img src={product.image} alt={product.name} />
      </div>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-2xl font-medium">${product.price}</p>
      <button
        onClick={handleAddToCart}
        disabled={isPending}
        className={`w-full flex items-center justify-center gap-2 text-lg rounded-full py-2 
          ${isPending ? "bg-[#8de68aa3] text-[#242424a3]" : "bg-[#8de68a] hover:bg-green-60 text-[#242424]"}`}
      >
        {isPending ? (<Check color="#242424a3" />) : (<ShoppingCart fill="#242424" />)} Agregar
      </button>
    </div>
  );
};
