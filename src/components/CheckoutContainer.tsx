import { useEffect, useState } from "react";
import { CheckoutForm } from "./CheckoutForm";
import { Loading } from "./Loading";
import { CartItem } from "../interfaces/CartItem";
import { CurrencyCode } from "../interfaces/Currency";
import { currencyValues } from "../consts/currencyCodes";
import { useCurrencyContext } from "../context/CurrencyContext";
import { useCountryContext } from "../context/CountryContext";

interface CheckoutContainerProps {
  cart: CartItem[];
  email: string;
}

export const CheckoutContainer: React.FC<CheckoutContainerProps> = ({
  cart,
  email,
}) => {
  const { currency } = useCurrencyContext();
  const { country } = useCountryContext();
  const [sessionToken, setSessionToken] = useState("");

  let totalAmount = 0;
  let currencyCode = "GBP";

  currency === CurrencyCode.GBP
    ? (totalAmount = cart.reduce(
        (sum, item) => sum + item.product.defaultAmount * item.quantity,
        0
      ))
    : currency === CurrencyCode.USD
    ? (totalAmount = cart.reduce(
        (sum, item) =>
          sum +
          item.product.defaultAmount * currencyValues[currency] * item.quantity,
        0
      ))
    : (totalAmount = cart.reduce(
        (sum, item) =>
          sum +
          item.product.defaultAmount * currencyValues[currency] * item.quantity,
        0
      ));

  currency === CurrencyCode.GBP
    ? (currencyCode = CurrencyCode.GBP)
    : currency === CurrencyCode.USD
    ? (currencyCode = CurrencyCode.USD)
    : (currencyCode = CurrencyCode.EUR);

  useEffect(() => {
    const postData = {
      amount: totalAmount,
      currency: currencyCode,
      country: country.code,
      email: email,
    };

    console.log(postData);

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
  }, [totalAmount, email, currencyCode, country]);

  return (
    <>
      {sessionToken ? (
        <CheckoutForm
          sessionToken={sessionToken}
          totalAmount={totalAmount}
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
