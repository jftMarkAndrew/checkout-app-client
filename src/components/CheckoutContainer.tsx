import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckoutForm } from "./CheckoutForm";
import { Loading } from "./Loading";

export const CheckoutContainer: React.FC = () => {
  const { state } = useLocation();
  const { amount, currency, country, email } = state;
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    const postData = {
      amount,
      currency,
      country,
      email,
    };

    console.log(postData.amount);
    console.log(postData.currency);
    console.log(postData.country);
    console.log(postData.email);

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
