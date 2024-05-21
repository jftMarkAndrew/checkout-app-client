import "../styles/cart.css";
import { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useCurrencyContext } from "../context/CurrencyContext";
import { useCountryContext } from "../context/CountryContext";
import { currencySymbols, currencyValues } from "../consts/currencyCodes";

export const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useCartContext();
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
          {cart.map((cartItem) => (
            <div className="cart-container">
              <div className="cart-content" key={cartItem.product.id}>
                <div>
                  <img
                    src={cartItem.product.imageUrl}
                    alt={cartItem.product.name}
                  />
                </div>
                <div className="item-title cart-item">
                  <div>
                    <h3>{cartItem.product.name}</h3>
                  </div>
                  <div>
                    <h3>
                      {currency ? currencySymbols[currency] : ""}
                      {(
                        cartItem.product.amount * currencyValues[currency]
                      ).toFixed(0)}
                    </h3>
                  </div>
                </div>
                <div className="item-counter">
                  <button onClick={() => removeFromCart(cartItem.product.id)}>
                    −
                  </button>
                  <h3>{cartItem.quantity}</h3>
                  <button onClick={() => addToCart(cartItem.product)}>+</button>
                </div>
              </div>
            </div>
          ))}

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
