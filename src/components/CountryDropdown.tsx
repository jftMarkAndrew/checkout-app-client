import React, { useState } from "react";
import { useCountryContext } from "../context/CountryContext";
import { CountryCode } from "../interfaces/CountryCode";
import { countryCodes } from "../consts/countryCodes";

export const CountryDropdown: React.FC = () => {
  const { country, updateCountry } = useCountryContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectCountry = (selectedCountry: CountryCode) => {
    updateCountry(selectedCountry);
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn-menu" onClick={toggleDropdown}>
        {country ? country.code : "Loading..."}
      </button>
      {isOpen && (
        <ul className="countries-dropdown">
          {countryCodes.map((country) => (
            <li key={country.code} onClick={() => handleSelectCountry(country)}>
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
