import { useState } from "react";
import { LogoComponent } from "./LogoComponent";
import { StoreComponent } from "./StoreComponent";
import { CheckoutComponent } from "./CheckoutComponent";
import { DetailsComponent } from "./DetailsComponent";
import { Product } from "../interfaces/Product";
import { CartItem } from "../interfaces/CartItem";
import { mockProducts } from "../consts/mockProducts";
import { Currency } from "../consts/currencyCodes";
import { CountryCode } from "../interfaces/CountryCode";

const products: Product[] = mockProducts;

export const ContainerComponent: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>(Currency.GBP);
  const [countryCode, setCountryCode] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState("");

  const handleCurrencyChange = (currency: Currency) => {
    console.log("Currency changed to:", currency);
    setCurrency(currency);
  };

  const handleCountryChange = (code: CountryCode) => {
    console.log("Selected country code:", code);
    setCountryCode(code.code);
  };

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
      <LogoComponent
        onCurrencyChange={handleCurrencyChange}
        onCountryChange={handleCountryChange}
      />
      {!showCheckout && (
        <StoreComponent
          products={products}
          cart={cart}
          currency={currency}
          onAddToCart={handleAddToCart}
        />
      )}
      {!showCheckout && cart.length > 0 && (
        <DetailsComponent
          cart={cart}
          email={email}
          currency={currency}
          onEmailChange={handleEmailChange}
          onContinue={proceedToCheckout}
        />
      )}
      {showCheckout && (
        <CheckoutComponent
          cart={cart}
          email={email}
          currency={currency}
          countryCode={countryCode}
        />
      )}
    </>
  );
};
