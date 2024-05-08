import { useState } from "react";
import { CartItem } from "./ContainerComponent";

interface DetailsComponentProps {
  cart: CartItem[];
  onContinue: () => void;
}

export const DetailsComponent: React.FC<DetailsComponentProps> = ({
  cart,
  onContinue,
}) => {
  const [email, setEmail] = useState("");
  const total = cart.reduce(
    (sum, item) => sum + item.product.priceGBP * item.quantity,
    0
  );

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <div className="details-container">
      <h1 className="text-shadow">£{total.toFixed(0)}</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="details-email-input"
      />
      <button className="details-email-button" onClick={onContinue} disabled={!isValidEmail(email)}>
        Continue
      </button>
    </div>
  );
};