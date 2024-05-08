// StoreComponent.tsx
import React from "react";
import { ItemComponent } from "./ItemComponent";
import { Product } from "./ContainerComponent";

// Assuming this is the type for products in the cart
type CartItem = {
  product: Product; // Assuming Product type is defined somewhere as shown earlier
  quantity: number;
};

// Extending StoreComponentProps to include 'cart'
interface StoreComponentProps {
  products: Product[];
  cart: CartItem[];  // This allows StoreComponent to use cart data
  onAddToCart: (product: Product) => void;
}

export const StoreComponent: React.FC<StoreComponentProps> = ({
  products,
  cart, // Now cart is part of the props and can be used within this component
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
