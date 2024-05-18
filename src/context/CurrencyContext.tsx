import React, { createContext, useContext, ReactNode } from "react";
import { useCurrency, useUpdateCurrency } from "../api/queries/currencyQueries";
import { CurrencyCode } from "../interfaces/Currency";

interface CurrencyContextType {
  currency: CurrencyCode;
  updateCurrency: (newCurrency: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: currency, isLoading, error } = useCurrency();
  const { mutate: updateCurrency } = useUpdateCurrency();

  if (isLoading) return <div>Loading...</div>;
  if (error || !currency) return <div>Error loading currency data</div>;

  return (
    <CurrencyContext.Provider value={{ currency, updateCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error(
      "useCurrencyContext must be used within a CurrencyProvider"
    );
  }
  return context;
};
