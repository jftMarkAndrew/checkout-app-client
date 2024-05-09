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
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.priceGBP * item.quantity,
    0
  );
  console.log(totalAmount);

  useEffect(() => {
    const postData = {
      amount: totalAmount,
      currency: "USD",
      country: "GB",
      email: email,
    };

    setTimeout(() => {
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
    }, 250);
  }, [totalAmount, email]);

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
