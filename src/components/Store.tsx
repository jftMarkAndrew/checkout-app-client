import React from "react";
import { Item } from "../components/Item";
import { useItemContext } from "../context/ItemContext";
import { useCartContext } from "../context/CartContext";

export const Store: React.FC = () => {
  const { items } = useItemContext();
  const { cart, addToCart } = useCartContext();

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
          />
        );
      })}
    </div>
  );
};
