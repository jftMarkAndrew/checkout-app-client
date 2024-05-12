import { useState } from "react";
import { CountryCode } from "../interfaces/CountryCode";
import { countryCodes } from "../consts/countryCodes";

export const CountryDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
    countryCodes[0]
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectCountry = (country: CountryCode) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn-menu" onClick={toggleDropdown}>
        {selectedCountry.code}
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
