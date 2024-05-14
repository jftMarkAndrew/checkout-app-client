import { useEffect, useState } from "react";
import { CheckoutForm } from "./CheckoutForm";
import { Loading } from "./Loading";
import { CartItem } from "../interfaces/CartItem";
import { Currency, currencyCodes } from "../consts/currencyCodes";
import { CountryCode } from "../interfaces/CountryCode";

interface CheckoutContainerProps {
  cart: CartItem[];
  email: string;
  currency: string;
  countryCode: CountryCode["code"];
}

export const CheckoutContainer: React.FC<CheckoutContainerProps> = ({
  cart,
  email,
  currency,
  countryCode,
}) => {
  const [sessionToken, setSessionToken] = useState("");

  let totalAmount = 0;
  let currencyCode = "GBP";

  currency === Currency.GBP
    ? (totalAmount = cart.reduce(
        (sum, item) => sum + item.product.priceGBP * item.quantity,
        0
      ))
    : currency === Currency.USD
    ? (totalAmount = cart.reduce(
        (sum, item) =>
          sum +
          item.product.priceGBP *
            currencyCodes[1].approximateValue *
            item.quantity,
        0
      ))
    : (totalAmount = cart.reduce(
        (sum, item) =>
          sum +
          item.product.priceGBP *
            currencyCodes[2].approximateValue *
            item.quantity,
        0
      ));

  currency === Currency.GBP
    ? (currencyCode = "GBP")
    : currency === Currency.USD
    ? (currencyCode = "USD")
    : (currencyCode = "EUR");

  useEffect(() => {
    const postData = {
      amount: totalAmount,
      currency: currencyCode,
      country: countryCode,
      email: email,
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
  }, [totalAmount, email, currency, currencyCode, countryCode]);

  return (
    <>
      {sessionToken ? (
        <CheckoutForm
          sessionToken={sessionToken}
          totalAmount={totalAmount}
          currency={currency}
        />
      ) : (
        <div className="checkout-container">
          <Loading />
        </div>
      )}
    </>
  );
};
