import { Link } from "react-router-dom";
import { Toggle } from "./Toggle";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { CountryDropdown } from "./CountryDropdown";
import { AiFillHome } from "react-icons/ai";
import { MdLocalGroceryStore } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { useCartContext } from "../context/CartContext";

export const Logo: React.FC = () => {
  const { totalQuantity } = useCartContext();
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
        <Link to="/store">
          <button className="btn-menu">
            <AiFillHome size="1.25em" title="Store" />
          </button>
        </Link>
        <Link to="/cart">
          <div className="icon-cart-relative">
            <button className="btn-menu">
              <MdLocalGroceryStore size="1.25em" title="Cart" />
            </button>
            {totalQuantity > 0 && (
              <div className="icon-cart-absolute">{totalQuantity}</div>
            )}
          </div>
        </Link>
        <Link to="/tracking">
          <button className="btn-menu">
            <MdDeliveryDining size="1.25em" title="Delivery" />
          </button>
        </Link>
        <CurrencyDropdown />
        <CountryDropdown />
      </div>
    </div>
  );
};
