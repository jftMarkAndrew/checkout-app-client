import { useState } from "react";
import { Logo } from "./Logo";
import { Store } from "./Store";
import { CheckoutContainer } from "./CheckoutContainer";
import { Details } from "./Details";
import { Product } from "../interfaces/Product";
import { CartItem } from "../interfaces/CartItem";
import { mockProducts } from "../consts/mockProducts";
import { Currency } from "../consts/currencyCodes";
import { CountryCode } from "../interfaces/CountryCode";

const products: Product[] = mockProducts;

export const StoreContainer: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>(Currency.GBP);
  const [countryCode, setCountryCode] = useState("IL");
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState("");

  const handleCurrencyChange = (currency: Currency) => {
    setCurrency(currency);
  };

  const handleCountryChange = (code: CountryCode) => {
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
      <Logo
        onCurrencyChange={handleCurrencyChange}
        onCountryChange={handleCountryChange}
      />
      {!showCheckout && (
        <Store
          products={products}
          cart={cart}
          currency={currency}
          onAddToCart={handleAddToCart}
        />
      )}
      {!showCheckout && cart.length > 0 && (
        <Details
          cart={cart}
          email={email}
          currency={currency}
          onEmailChange={handleEmailChange}
          onContinue={proceedToCheckout}
        />
      )}
      {showCheckout && (
        <CheckoutContainer
          cart={cart}
          email={email}
          currency={currency}
          countryCode={countryCode}
        />
      )}
    </>
  );
};
