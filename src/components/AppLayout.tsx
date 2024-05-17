import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "./Logo";
import { CountryCode } from "../interfaces/CountryCode";
import { CurrencySymbol } from "../interfaces/Currency";
import { countryCodes } from "../consts/countryCodes";

export const AppLayout = () => {
  const [currencySymbol, setCurrencySymbol] = useState<CurrencySymbol>(
    CurrencySymbol.GBP
  );
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);

  const handleCurrencyChange = (currency: CurrencySymbol) => {
    setCurrencySymbol(currency);
  };

  const handleCountryChange = (code: CountryCode) => {
    setCountryCode(code.code);
  };

  return (
    <div className="content-grid">
      <header>
        <Logo
          onCurrencyChange={handleCurrencyChange}
          onCountryChange={handleCountryChange}
        />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
