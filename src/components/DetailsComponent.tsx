import validator from "validator";
import { CartItem } from "../interfaces/CartItem";
import { Currency, currencyCodes } from "../consts/currencyCodes";

interface DetailsComponentProps {
  cart: CartItem[];
  email: string;
  currency: Currency;
  onEmailChange: (email: string) => void;
  onContinue: () => void;
}

export const DetailsComponent: React.FC<DetailsComponentProps> = ({
  cart,
  email,
  currency,
  onEmailChange,
  onContinue,
}) => {
  let total = 0;

  currency === Currency.GBP
    ? (total = cart.reduce(
        (sum, item) => sum + item.product.priceGBP * item.quantity,
        0
      ))
    : currency === Currency.USD
    ? (total = cart.reduce(
        (sum, item) =>
          sum +
          item.product.priceGBP *
            currencyCodes[1].approximateValue *
            item.quantity,
        0
      ))
    : (total = cart.reduce(
        (sum, item) =>
          sum +
          item.product.priceGBP *
            currencyCodes[2].approximateValue *
            item.quantity,
        0
      ));

  const isValidEmail = (email: string): boolean => {
    return validator.isEmail(email);
  };

  return (
    <div className="details-container">
      <h1 className="text-shadow">
        {currency}
        {total.toFixed(0)}
      </h1>
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
