import validator from "validator";
import { CartItem } from "../interfaces/CartItem";

interface DetailsComponentProps {
  cart: CartItem[];
  email: string;
  onEmailChange: (email: string) => void;
  onContinue: () => void;
}

export const DetailsComponent: React.FC<DetailsComponentProps> = ({
  cart,
  email,
  onEmailChange,
  onContinue,
}) => {
  const total = cart.reduce(
    (sum, item) => sum + item.product.priceGBP * item.quantity,
    0
  );

  const isValidEmail = (email: string): boolean => {
    return validator.isEmail(email);
  };

  return (
    <div className="details-container">
      <h1 className="text-shadow">£{total.toFixed(0)}</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="Enter your email"
        className="details-email-input"
      />
      <button
        className="details-email-button"
        onClick={onContinue}
        disabled={!isValidEmail(email)}
      >
        Continue
      </button>
    </div>
  );
};
