import { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useCurrencyContext } from "../context/CurrencyContext";
import { useCountryContext } from "../context/CountryContext";
import { currencySymbols, currencyValues } from "../consts/currencyCodes";

export const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCartContext();
  const { currency } = useCurrencyContext();
  const { country } = useCountryContext();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email: string): boolean => {
    return validator.isEmail(email);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isValidEmail(email) && event.key === "Enter") {
      handleContinue();
    }
  };

  const handleContinue = () => {
    if (isValidEmail(email)) {
      const totalAmount = +getTotalPrice();
      const postData = {
        amount: totalAmount,
        currency: currency,
        country: country.code,
        email: email,
      };
      navigate("/checkout", { state: postData });
    }
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, cartItem) => {
        const price = cartItem.product.amount * currencyValues[currency];
        return total + price * cartItem.quantity;
      }, 0)
      .toFixed(0);
  };

  return (
    <div className="tracking-container">
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Do not hesitate to change it right now!</p>
      ) : (
        <>
          <ul>
            {cart.map((cartItem) => (
              <li key={cartItem.product.id}>
                <span>
                  {cartItem.product.name} -{" "}
                  {currency ? currencySymbols[currency] : ""}
                  {(cartItem.product.amount * currencyValues[currency]).toFixed(
                    0
                  )}
                </span>
                <span>Quantity: {cartItem.quantity}</span>
                <button onClick={() => removeFromCart(cartItem.product.id)}>
                  −
                </button>
                <button onClick={() => addToCart(cartItem.product)}>+</button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Clear Cart</button>

          <h3 className="text-shadow">
            Total Amount: {currency ? currencySymbols[currency] : ""}
            {getTotalPrice()}
          </h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your email"
            className="details-email-input"
          />
          <button
            className="details-email-button"
            onClick={handleContinue}
            disabled={!isValidEmail(email)}
          >
            Continue
          </button>
        </>
      )}
    </div>
  );
};
