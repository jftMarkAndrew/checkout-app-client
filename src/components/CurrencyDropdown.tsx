import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { CurrencyCode, CurrencySymbol } from "../interfaces/Currency";

interface CurrencyDropdownProps {
  onCurrencyChange: (currencySymbol: CurrencySymbol) => void;
}

export const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  onCurrencyChange,
}) => {
  const currencySymbols: Record<CurrencyCode, CurrencySymbol> = {
    [CurrencyCode.GBP]: CurrencySymbol.GBP,
    [CurrencyCode.USD]: CurrencySymbol.USD,
    [CurrencyCode.EUR]: CurrencySymbol.EUR,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useLocalStorage<CurrencyCode>(
    "selectedCurrency",
    CurrencyCode.GBP
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCurrencyChange = (currencyCode: CurrencyCode) => {
    setSelectedCurrency(currencyCode);
    onCurrencyChange(currencySymbols[currencyCode]);
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
