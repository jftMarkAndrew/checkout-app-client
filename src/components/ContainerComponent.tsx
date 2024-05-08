import { useState } from "react";
import { LogoComponent } from "./LogoComponent";
import { StoreComponent } from "./StoreComponent";
import { CheckoutContainer } from "./CheckoutContainer";
import { ResultComponent } from "./ResultComponent";
import { TrackComponent } from "./TrackComponent";
import { DetailsComponent } from "./DetailsComponent";
import { Product, mockProducts } from "../consts/mockProducts";

export type CartItem = {
  product: Product;
  quantity: number;
};

const products: Product[] = mockProducts;

export const ContainerComponent = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const proceedToCheckout = () => {
    setShowCheckout(true);
  };

  return (
    <>
      {/* TODO BASCET (link to CheckoutContainer), TRACK ORDER (link to TrackComponent), LIGHT/DARK MODE, PREVIOUS/NEXT BTN */}
      <LogoComponent />
      {!showCheckout && (
        <StoreComponent
          products={products}
          cart={cart}
          onAddToCart={handleAddToCart}
        />
      )}
      {!showCheckout && cart.length > 0 && (
        <DetailsComponent cart={cart} onContinue={proceedToCheckout} />
      )}
      {showCheckout && <CheckoutContainer cart={cart} />}
      <ResultComponent />
      <TrackComponent />
    </>
  );
};
