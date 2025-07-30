import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import PromotionBadge from "../../assets/images/promotion-badge.png";
import { useCart } from "../../hooks/useCart";
import { useAddProductToCart } from "../../hooks/useAddProductToCart";
import { PromotionsProducts } from "../../interfaces/promotion";

export const Product = ({ product, promotion }: PromotionsProducts) => {
  const { addToCart } = useCart();
  const { mutate, isPending } = useAddProductToCart();

  const handleAddToCart = () => {
    mutate(
      { productId: product.id, quantity: 1 },
      {
        onSuccess: (data) => {
          const { id, product, quantity } = data;
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
            cartItemId: id,
          });

          toast.success("Producto agregado al carrito");
        },
        onError: () => {
          toast.error("Error al agregar al carrito");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="relative bg-[#6EC3F64D] rounded-2xl cursor-pointer">
        {/* PERCENT */}
        {promotion?.data.percent && (
          <figure className="absolute top-1 left-1 w-12 drop-shadow-md">
            <label className="absolute bottom-3.5 text-sm left-1/2 -translate-x-1/2 text-white">${promotion.data.percent}</label>
            <img
              className="object-cover w-full"
              src={PromotionBadge}
              alt={`Insignia de descuento del ${promotion.data.percent} por ciento`}
              width={500}
              height={500}
              loading="lazy"
            />
          </figure>
        )}
        {/* COMBO */}
        {promotion?.data.buy && (
          <figure className="absolute top-1 left-1 w-12 drop-shadow-md">
            <label className="absolute bottom-3.5 text-sm left-1/2 -translate-x-1/2 text-white text-nowrap">{promotion.data.buy}x{promotion.data.pay}</label>
            <img
              className="object-cover w-full"
              src={PromotionBadge}
              alt={`Insignia de descuento del ${promotion.data.buy}%`}
              width={500}
              height={500}
              loading="lazy"
            />
          </figure>
        )}
        {/* IMAGE PRODUCT */}
        <img
          src={product.image}
          alt={product.name}
          className="h-28 object-contain mx-auto p-1"
        />
      </div>
      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-2xl font-medium">${product.price}</p>
      <button
        onClick={handleAddToCart}
        disabled={isPending}
        className={`flex items-center justify-center gap-2 text-sm rounded-full py-2
        ${isPending
            ? "bg-[#C6F3C4] text-[#A0A0A0]"
            : "bg-[#8de68a] hover:bg-green-60"
          }`}
      >
        {isPending ? (
          "Agregando..."
        ) : (
          <>
            <ShoppingCart fill="currentColor" size={18} />
            Agregar
          </>
        )}
      </button>
    </div>
  );
};
