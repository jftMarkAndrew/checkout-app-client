import "../styles/store.css";
import { Item } from "../components/Item";
import { useItemContext } from "../context/ItemContext";
import { useCartContext } from "../context/CartContext";

export const Store: React.FC = () => {
  const { items } = useItemContext();
  const { cart, addToCart, removeFromCart } = useCartContext();

  return (
    <div className="store-container">
      {items.map((item) => {
        const quantity =
          cart.find((cartItem) => cartItem.product.id === item.id)?.quantity ||
          0;
        return (
          <Item
            key={item.id}
            item={item}
            quantity={quantity}
            onAddItem={() => addToCart(item)}
            onRemoveItem={() => removeFromCart(item.id)}
          />
        );
      })}
    </div>
  );
};
