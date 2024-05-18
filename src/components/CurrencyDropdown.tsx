import React, { useState } from "react";
import { CurrencyCode } from "../interfaces/Currency";
import { useCurrencyContext } from "../context/CurrencyContext";
import { currencySymbols } from "../consts/currencyCodes";

export const CurrencyDropdown: React.FC = () => {
  const { currency, updateCurrency } = useCurrencyContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCurrencyChange = (currencyCode: CurrencyCode) => {
    updateCurrency(currencyCode);
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn-menu" onClick={toggleDropdown}>
        {currency ? currencySymbols[currency] : "Loading..."}
      </button>
      {isOpen && (
        <div className="currency-dropdown">
          {Object.entries(currencySymbols).map(([code, symbol]) => (
            <button
              className="btn-menu"
              key={code}
              onClick={() => handleCurrencyChange(code as CurrencyCode)}
            >
              {symbol}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
