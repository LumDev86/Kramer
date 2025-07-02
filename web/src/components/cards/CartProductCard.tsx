import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "../../hooks/useCart"
import { CartProduct } from "../../interfaces/cart"

type CartProductCardProps = {
  id: string
  name: string
  image?: string
  price: number
  quantity: number
  product: CartProduct
}

export default function CartProductCard({ id, name, image, price, quantity, product }: CartProductCardProps) {
  const { addToCart, removeFromCart, updateCartItem } = useCart();

  return (
    <section
      className="flex items-center justify-between gap-2 rounded-md"
    >
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 bg-[#6EC3F64D] px-4 py-1 rounded-2xl w-28 h-28 flex items-center justify-center">
          <img
            src={image || ''}
            alt={`imagen ${name}`}
            className="object-contain w-full h-full bg-transparent"
          />
        </div>
        <div className="font-semibold flex flex-col gap-2">
          <p className="text-lg">{name}</p>
          <p className="text-2xl">${(price * quantity).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 p-1 rounded-sm outline outline-1 outline-[#6EC3F680]">
          <button
            onClick={() =>
              quantity && quantity > 1
                ? updateCartItem(id, quantity - 1)
                : removeFromCart(id)
            }
          >
            <Minus size={20} />
          </button>
          <p className="font-semibold">{quantity}</p>
          <button onClick={() => addToCart(product)}>
            <Plus size={20} />
          </button>
        </div>
        <Trash2
          size={28}
          onClick={() => removeFromCart(id)}
          className="cursor-pointer"
        />
      </div>
    </section>
  )
}
