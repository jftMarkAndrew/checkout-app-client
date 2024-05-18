import { createContext, useContext, ReactNode } from "react";
import { useCountry, useUpdateCountry } from "../api/queries/countryQueries";
import { CountryCode } from "../interfaces/CountryCode";

interface CountryContextType {
  country: CountryCode;
  updateCountry: (newCountry: CountryCode) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: country, isLoading, error } = useCountry();
  const { mutate: updateCountry } = useUpdateCountry();

  if (isLoading) return <div>Loading...</div>;
  if (error || !country) return <div>Error loading country data</div>;

  return (
    <CountryContext.Provider value={{ country, updateCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryContext must be used within a CountryProvider");
  }
  return context;
};
