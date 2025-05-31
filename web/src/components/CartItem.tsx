// CartItem.tsx
import { Plus, Minus } from "lucide-react";
import { CartItemProps } from "../interfaces/interfaces";


const CartItem: React.FC<CartItemProps> = ({ item, updateCartItem, decreaseQuantity }) => {
  return (
    <li className="flex justify-between items-center border-b pb-2">
      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-gray-500">Precio: ${item.price}</p>
        <p className="text-gray-500">Subtotal: ${item.price * item.quantity}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateCartItem(item.id, item.quantity + 1)}
          className="bg-green-500 text-white p-1 rounded-md hover:bg-green-600"
        >
          <Plus className="w-4 h-4" />
        </button>
        <p className="font-semibold">{item.quantity}</p>
        <button
          onClick={() => decreaseQuantity(item)}
          className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
};

export default CartItem;