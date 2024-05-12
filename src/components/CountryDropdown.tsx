import { useState } from "react";
import { CountryCode } from "../interfaces/CountryCode";
import { countryCodes } from "../consts/countryCodes";
import useLocalStorage from "use-local-storage";

interface CountryDropdownProps {
  onCountryChange: (code: CountryCode) => void;
}

export const CountryDropdown: React.FC<CountryDropdownProps> = ({
  onCountryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useLocalStorage<CountryCode>(
    "selectedCountry",
    countryCodes[0]
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectCountry = (country: CountryCode) => {
    setSelectedCountry(country);
    onCountryChange(country);
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
