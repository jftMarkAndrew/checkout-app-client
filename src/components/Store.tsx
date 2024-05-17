// Store.tsx
import React from "react";
import { Item } from "./Item";
import { Product } from "../interfaces/Product";
import { CartItem } from "../interfaces/CartItem";
import { CurrencySymbol } from "../interfaces/Currency";

interface StoreProps {
  products: Product[];
  cart: CartItem[];
  currency: CurrencySymbol;
  onAddToCart: (product: Product) => void;
}

export const Store: React.FC<StoreProps> = ({
  products,
  cart,
  currency,
  onAddToCart,
}) => {
  return (
    <div className="store-container">
      {products.map((product) => {
        const quantity =
          cart.find(
            (item: { product: { id: number } }) =>
              item.product.id === product.id
          )?.quantity || 0;
        return (
          <Item
            key={product.id}
            imageUrl={product.imageUrl}
            productName={product.name}
            productPriceGBP={product.priceGBP.toFixed(0)}
            currency={currency}
            quantity={quantity}
            onAddItem={() => onAddToCart(product)}
          />
        );
      })}
    </div>
  );
};
