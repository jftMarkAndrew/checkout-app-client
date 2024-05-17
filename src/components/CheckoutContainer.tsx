import { useEffect, useState } from "react";
import { CheckoutForm } from "./CheckoutForm";
import { Loading } from "./Loading";
import { CartItem } from "../interfaces/CartItem";
import { CountryCode } from "../interfaces/CountryCode";
import { CurrencyCode, CurrencySymbol } from "../interfaces/Currency";
import { currencyCodes } from "../consts/currencyCodes";

interface CheckoutContainerProps {
  cart: CartItem[];
  email: string;
  currency: CurrencySymbol;
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

  currency === CurrencySymbol.GBP
    ? (totalAmount = cart.reduce(
        (sum, item) => sum + item.product.priceGBP * item.quantity,
        0
      ))
    : currency === CurrencySymbol.USD
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

  currency === CurrencySymbol.GBP
    ? (currencyCode = CurrencyCode.GBP)
    : currency === CurrencySymbol.USD
    ? (currencyCode = CurrencyCode.USD)
    : (currencyCode = CurrencyCode.EUR);

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
  }, [totalAmount, email, currency, countryCode, currencyCode]);

  return (
    <>
      {sessionToken ? (
        <CheckoutForm
          sessionToken={sessionToken}
          totalAmount={totalAmount}
          currency={currency}
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
