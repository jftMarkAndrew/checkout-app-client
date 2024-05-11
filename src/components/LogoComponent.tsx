import { Link } from "react-router-dom";
import { Toggle } from "./Toggle";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { Currency } from "../consts/currencyCodes";

interface LogoComponentProps {
  onCurrencyChange: (currency: Currency) => void;
}

export const LogoComponent: React.FC<LogoComponentProps> = ({
  onCurrencyChange,
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
        <Link to="/">
          <button className="btn-menu">
            <img src="/src/assets/icons/home_icon.svg" alt="Home" />
          </button>
        </Link>
        {/* <Link to="/cart">
          <button className="btn-menu">
            <img src="/src/assets/icons/cart_icon.svg" alt="Cart" />
          </button>
        </Link> */}
        <CurrencyDropdown onCurrencyChange={onCurrencyChange} />
        <button className="btn-menu">IL</button>
        <Link to="/tracking">
          <button className="btn-menu">Orders</button>
        </Link>
      </div>
    </div>
  );
};
