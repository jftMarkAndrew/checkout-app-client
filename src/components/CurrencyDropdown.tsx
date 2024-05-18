import { useState } from "react";
import { useCurrencyContext } from "../context/CurrencyContext";
import { CurrencyCode, CurrencySymbol } from "../interfaces/Currency";

const currencySymbols: Record<string, CurrencySymbol> = {
  GBP: CurrencySymbol.GBP,
  USD: CurrencySymbol.USD,
  EUR: CurrencySymbol.EUR,
};

export const CurrencyDropdown: React.FC = () => {
  const { currency, currencies, updateCurrency } = useCurrencyContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCurrencyChange = (currencyCode: string) => {
    updateCurrency(currencyCode as CurrencyCode);
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn-menu" onClick={toggleDropdown}>
        {currency ? currencySymbols[currency] : "Loading..."}
      </button>
      {isOpen && (
        <div className="currency-dropdown">
          {currencies.map((currency) => (
            <button
              className="btn-menu"
              key={currency.code}
              onClick={() => handleCurrencyChange(currency.code)}
            >
              {currencySymbols[currency.code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
