import { useState } from "react";
import { LogoComponent } from "./LogoComponent";
import { StoreComponent } from "./StoreComponent";
import { CheckoutContainer } from "./CheckoutContainer";
import { DetailsComponent } from "./DetailsComponent";
import { Product } from "../interfaces/Product";
import { CartItem } from "../interfaces/CartItem";
import { mockProducts } from "../consts/mockProducts";

const products: Product[] = mockProducts;

export const ContainerComponent = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState("");

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

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const proceedToCheckout = () => {
    setShowCheckout(true);
  };

  return (
    <>
      {/* TODO TRACK ORDER (link to TrackComponent), LIGHT/DARK MODE, PREVIOUS/NEXT BTN */}
      <LogoComponent />
      {!showCheckout && (
        <StoreComponent
          products={products}
          cart={cart}
          onAddToCart={handleAddToCart}
        />
      )}
      {!showCheckout && cart.length > 0 && (
        <DetailsComponent
          cart={cart}
          email={email}
          onEmailChange={handleEmailChange}
          onContinue={proceedToCheckout}
        />
      )}
      {showCheckout && <CheckoutContainer cart={cart} email={email} />}
    </>
  );
};
