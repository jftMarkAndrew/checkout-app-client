import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  useCountry,
  useCountries,
  useUpdateCountry,
} from "../api/queries/countryQueries";
import { CountryCode } from "../interfaces/CountryCode";

interface CountryContextType {
  country: CountryCode;
  countries: CountryCode[];
  updateCountry: (newCountry: CountryCode) => void;
}

const defaultCountry: CountryCode = { code: "IL", name: "Israel" };

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    data: country,
    isLoading: isCountryLoading,
    error: countryError,
  } = useCountry();
  const {
    data: countries,
    isLoading: isCountriesLoading,
    error: countriesError,
  } = useCountries();
  const { mutate: updateCountry } = useUpdateCountry();
  const [currentCountry, setCurrentCountry] =
    useState<CountryCode>(defaultCountry);

  useEffect(() => {
    if (country) {
      setCurrentCountry(country);
    }
  }, [country]);

  if (isCountryLoading || isCountriesLoading) return <div>Loading...</div>;
  if (countryError || countriesError) {
    console.error("Country Error:", countryError);
    console.error("Countries Error:", countriesError);
    return <div>Error loading country data</div>;
  }

  const handleUpdateCountry = (newCountry: CountryCode) => {
    updateCountry(newCountry);
    setCurrentCountry(newCountry);
  };

  return (
    <CountryContext.Provider
      value={{
        country: currentCountry,
        countries: countries || [],
        updateCountry: handleUpdateCountry,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryContext must be used within a CountryProvider");
  }
  return context;
};
