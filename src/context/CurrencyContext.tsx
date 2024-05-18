import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  useCurrency,
  useCurrencies,
  useUpdateCurrency,
} from "../api/queries/currencyQueries";
import { Currency, CurrencyCode } from "../interfaces/Currency";

interface CurrencyContextType {
  currency: CurrencyCode;
  currencies: Currency[];
  updateCurrency: (newCurrency: CurrencyCode) => void;
}

const defaultCurrency: CurrencyCode = CurrencyCode.GBP;

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    data: currency,
    isLoading: isCurrencyLoading,
    error: currencyError,
  } = useCurrency();
  const {
    data: currencies,
    isLoading: isCurrenciesLoading,
    error: currenciesError,
  } = useCurrencies();
  const { mutate: updateCurrency } = useUpdateCurrency();
  const [currentCurrency, setCurrentCurrency] =
    useState<CurrencyCode>(defaultCurrency);

  useEffect(() => {
    if (currency) {
      setCurrentCurrency(currency);
    }
  }, [currency]);

  if (isCurrencyLoading || isCurrenciesLoading) return <div>Loading...</div>;
  if (currencyError || currenciesError) {
    console.error("Currency Error:", currencyError);
    console.error("Currencies Error:", currenciesError);
    return <div>Error loading currency data</div>;
  }

  const handleUpdateCurrency = (newCurrency: CurrencyCode) => {
    updateCurrency(newCurrency);
    setCurrentCurrency(newCurrency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency: currentCurrency,
        currencies: currencies || [],
        updateCurrency: handleUpdateCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error(
      "useCurrencyContext must be used within a CurrencyProvider"
    );
  }
  return context;
};
