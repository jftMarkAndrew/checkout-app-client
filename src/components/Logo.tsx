import { Link } from "react-router-dom";
import { Toggle } from "./Toggle";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { Currency } from "../consts/currencyCodes";
import { CountryDropdown } from "./CountryDropdown";
import { CountryCode } from "../interfaces/CountryCode";
import { AiFillHome } from "react-icons/ai";
import { MdDeliveryDining } from "react-icons/md";

interface LogoProps {
  onCurrencyChange?: (currency: Currency) => void;
  onCountryChange?: (code: CountryCode) => void;
}

export const Logo: React.FC<LogoProps> = ({
  onCurrencyChange,
  onCountryChange,
}) => {
  return (
    <div className="logo">
      <div className="logo-container">
        <img
          className="logo-unipaas"
          src="/src/assets/icons/fav_icon_logo_unipaas.svg"
          alt=""
        />
        <div className="logo-title">
          <h1>
            <a href="https://www.unipaas.com/" target="_blank">
              UNIPaaS
            </a>{" "}
            Web SDK
          </h1>
          <p>
            Integration Example by{" "}
            <a
              href="https://www.linkedin.com/in/mark-andrew-jft/"
              target="_blank"
            >
              Mark Andrew
            </a>
          </p>
        </div>
      </div>
      <div className="toggle">
        <Toggle />
      </div>
      <div className="menu-container">
        <a href="/">
          <button className="btn-menu">
            <AiFillHome size="1.25em" title="Store" />
          </button>
        </a>
        {onCurrencyChange && (
          <CurrencyDropdown onCurrencyChange={onCurrencyChange} />
        )}
        {onCountryChange && (
          <CountryDropdown onCountryChange={onCountryChange} />
        )}
        <Link to="/tracking">
          <button className="btn-menu">
            <MdDeliveryDining size="1.25em" title="Delivery" />
          </button>
        </Link>
      </div>
    </div>
  );
};
