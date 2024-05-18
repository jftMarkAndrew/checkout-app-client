import { Link } from "react-router-dom";
import { Toggle } from "./Toggle";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { CountryDropdown } from "./CountryDropdown";
import { AiFillHome } from "react-icons/ai";
import { MdDeliveryDining } from "react-icons/md";

export const Logo: React.FC = () => {
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
        <CurrencyDropdown />
        <CountryDropdown />
        <Link to="/tracking">
          <button className="btn-menu">
            <MdDeliveryDining size="1.25em" title="Delivery" />
          </button>
        </Link>
      </div>
    </div>
  );
};
