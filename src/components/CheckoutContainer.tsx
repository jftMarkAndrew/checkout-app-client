import { useEffect, useState } from "react";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutLoading } from "./CheckoutLoading";
import { CartItem } from "./ContainerComponent";

interface CheckoutContainerProps {
  cart: CartItem[];
  email: string;
}

export const CheckoutContainer: React.FC<CheckoutContainerProps> = ({
  cart,
  email,
}) => {
  console.log(cart);
  console.log(email);
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/checkout/session-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
  }, []);

  return (
    <>
      {sessionToken ? (
        <CheckoutForm sessionToken={sessionToken} />
      ) : (
        <div className="checkout-container checkout-content">
          <CheckoutLoading />
        </div>
      )}
    </>
  );
};
