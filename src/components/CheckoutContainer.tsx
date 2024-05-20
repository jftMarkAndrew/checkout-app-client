import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckoutForm } from "./CheckoutForm";
import { Loading } from "./Loading";
import { useCurrencyContext } from "../context/CurrencyContext";
import { useCountryContext } from "../context/CountryContext";
import { currencyValues } from "../consts/currencyCodes";
import { useCartContext } from "../context/CartContext";

export const CheckoutContainer: React.FC = () => {
  const { state } = useLocation();
  const { email } = state;
  const [sessionToken, setSessionToken] = useState("");

  const { currency } = useCurrencyContext();
  const { country } = useCountryContext();
  const { cart } = useCartContext();

  const getTotalPrice = () => {
    return cart
      .reduce((total, cartItem) => {
        const price = cartItem.product.amount * currencyValues[currency];
        return total + price * cartItem.quantity;
      }, 0)
      .toFixed(0);
  };

  const amount = +getTotalPrice();

  useEffect(() => {
    const postData = {
      amount: +getTotalPrice(),
      currency: currency,
      country: country.code,
      email,
    };

    fetch("http://localhost:3000/checkout/session-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sessionToken) {
          setTimeout(() => {
            setSessionToken(data.sessionToken);
          }, 250);
        } else {
          console.error("Failed to retrieve session token");
        }
      })
      .catch((error) => {
        console.error("Error fetching session token:", error);
      });
  }, [amount, currency, country, email]);

  return (
    <>
      {sessionToken ? (
        <CheckoutForm
          sessionToken={sessionToken}
          totalAmount={+amount}
          email={email}
        />
      ) : (
        <div className="checkout-container">
          <Loading />
        </div>
      )}
    </>
  );
};
