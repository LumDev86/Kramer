import { useCart } from "../hooks/useCart";
import CartItem from "../components/cards/CartItem";
import { ShoppingCart } from "lucide-react";
import { CartProduct } from "../interfaces/cart";

export default function Cart() {
  const { cart, total } = useCart();

  const sendData = () => {
    const products: CartProduct[] = [];
    cart.forEach(ct => {
      products.push({
        id: ct.id,
        name: ct.name,
        price: ct.price,
        quantity: ct.quantity,
        cartItemId: ct.cartItemId
      })
    });
    console.log({
      products,
      totalPrice: total,
      totalShipment: 1.9
    })
  }

  return (
    <section className='font-outfit flex flex-col gap-8 my-[10px]'>
      <section className='text-4xl font-semibold flex justify-center items-center h-[218px] bg-gradient-to-br from-[#D9F3FF] to-[#FDF0E6] rounded-2xl'>
        <img
          src="./src/assets/logos/logo-cart.png"
          className="w-32 h-32 bg-transparent"
        />
        <p className='bg-transparent text-[#1D1D1F]'>Carrito</p>
      </section>
      <section className="flex flex-col gap-4">
        {
          cart.map((pr, i) => (
            <CartItem
              key={i}
              {...pr}
              quantity={pr.quantity ?? 1}
            />
          ))
        }
      </section>
      <div className="flex flex-col gap-4 text-lg font-medium">
        <p>Subtotal: ${total.toFixed(2)}</p>
        <p>Envío: $1.99</p>
        <p className="text-right text-2xl">Total: ${(total + 1.99).toFixed(2)}</p>
      </div>
      <button onClick={sendData} className="flex items-center justify-center gap-2 bg-[#8DE68A] text-[#242424] rounded-full py-2">
        <ShoppingCart color="#242424" className="bg-transparent"/>
        Proceder al pago
      </button>
    </section>
  )
}
