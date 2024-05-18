import { useState } from "react";
import { Store } from "./Store";
import { CheckoutContainer } from "./CheckoutContainer";
/* import { Details } from "./Details"; */

export const StoreContainer: React.FC = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [email, setEmail] = useState("");

  /* const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const proceedToCheckout = () => {
    setShowCheckout(true);
  }; */

  return (
    <>
      {!showCheckout && <Store />}
      {/* {!showCheckout && (
        <Details
          email={email}
          onEmailChange={handleEmailChange}
          onContinue={proceedToCheckout}
          cart={[]}
        />
      )} */}
      {showCheckout && <CheckoutContainer email={email} cart={[]} />}
    </>
  );
};
