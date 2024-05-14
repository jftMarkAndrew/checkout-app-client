import { useState } from "react";
import { CartItem } from "../interfaces/CartItem";
import { Currency, currencyCodes } from "../consts/currencyCodes";
import validator from "validator";
import { MdLocalGroceryStore } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

interface DetailsProps {
  cart: CartItem[];
  email: string;
  currency: Currency;
  onEmailChange: (email: string) => void;
  onContinue: () => void;
}

export const Details: React.FC<DetailsProps> = ({
  cart,
  email,
  currency,
  onEmailChange,
  onContinue,
}) => {
  const [showDetails, setShowDetails] = useState(false);

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isValidEmail(email)) {
      if (event.key === "Enter") {
        onContinue();
      }
    }
  };

  return (
    <>
      {!showDetails && (
        <div className="open-details-btn" onClick={() => setShowDetails(true)}>
          <MdLocalGroceryStore
            onClick={() => setShowDetails(true)}
            className="open-details-cart"
          />
        </div>
      )}

      {showDetails && (
        <div className="details-container">
          <div
            className="close-details-btn"
            onClick={() => setShowDetails(false)}
          >
            <IoCloseOutline
              size="2em"
              onClick={() => setShowDetails(false)}
              className="close-details-cart"
            />
          </div>
          <h3 className="text-shadow">
            Total Amount: {currency}
            {total.toFixed(0)}
          </h3>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            onKeyDown={handleKeyDown}
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
      )}
    </>
  );
};
