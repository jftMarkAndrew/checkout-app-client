import { useState } from "react";
import { Currency } from "../consts/currencyCodes";

interface CurrencyDropdownProps {
  onCurrencyChange: (currencyCode: Currency) => void;
}

export const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  onCurrencyChange,
}) => {
  const currencySymbols: Record<Currency, string> = {
    [Currency.GBP]: "£",
    [Currency.USD]: "$",
    [Currency.EUR]: "€",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    Currency.GBP
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCurrencyChange = (currencyCode: Currency) => {
    setSelectedCurrency(currencyCode);
    onCurrencyChange(currencyCode);
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn-menu" onClick={toggleDropdown}>
        {currencySymbols[selectedCurrency]}
      </button>
      {isOpen && (
        <div className="currency-dropdown">
          {Object.entries(currencySymbols).map(([code, symbol]) => (
            <button
              className="btn-menu"
              key={code}
              onClick={() => handleCurrencyChange(code as Currency)}
            >
              {symbol}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
