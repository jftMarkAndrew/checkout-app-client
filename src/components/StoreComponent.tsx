// StoreComponent.tsx
import React from "react";
import { ItemComponent } from "./ItemComponent";
import { Product } from "../interfaces/Product";
import { CartItem } from "../interfaces/CartItem";

interface StoreComponentProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
}

export const StoreComponent: React.FC<StoreComponentProps> = ({
  products,
  cart,
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
          <ItemComponent
            key={product.id}
            imageUrl={product.imageUrl}
            productName={product.name}
            productPriceGBP={product.priceGBP.toFixed(2)}
            quantity={quantity}
            onAddItem={() => onAddToCart(product)}
          />
        );
      })}
    </div>
  );
};
