import "../styles/logo.css";
import { Link, useLocation } from "react-router-dom";
import { Toggle } from "./Toggle";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { CountryDropdown } from "./CountryDropdown";
import { AiFillHome } from "react-icons/ai";
import { MdLocalGroceryStore } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { useCartContext } from "../context/CartContext";

export const Logo: React.FC = () => {
  const { totalQuantity } = useCartContext();
  const location = useLocation();

  return (
    <div className="header-container">
      <div className="logo">
        <div className="logo-container">
          <img
            className="logo-unipaas"
            src="/src/assets/icons/fav_icon_logo_unipaas.svg"
            alt=""
          />
          <div className="toggle">
            <Toggle />
          </div>
        </div>
      </div>
      <div className="menu-container">
        {location.pathname === "/checkout" ? (
          <>
            <a className="btn" href="/store">
              <button className="btn-menu">
                <AiFillHome size="1.25em" title="Store" />
              </button>
            </a>
            <a className="btn" href="/cart">
              <div className="icon-cart-relative">
                <button className="btn-menu">
                  <MdLocalGroceryStore size="1.25em" title="Cart" />
                </button>
                {totalQuantity > 0 && (
                  <div className="icon-cart-absolute">{totalQuantity}</div>
                )}
              </div>
            </a>
            <a className="btn" href="/tracking">
              <button className="btn-menu">
                <MdDeliveryDining size="1.25em" title="Delivery" />
              </button>
            </a>
          </>
        ) : (
          <>
            <Link className="btn" to="/store">
              <button className="btn-menu">
                <AiFillHome size="1.25em" title="Store" />
              </button>
            </Link>
            <Link className="btn" to="/cart">
              <div className="icon-cart-relative">
                <button className="btn-menu">
                  <MdLocalGroceryStore size="1.25em" title="Cart" />
                </button>
                {totalQuantity > 0 && (
                  <div className="icon-cart-absolute">{totalQuantity}</div>
                )}
              </div>
            </Link>
            <Link className="btn" to="/tracking">
              <button className="btn-menu">
                <MdDeliveryDining size="1.25em" title="Delivery" />
              </button>
            </Link>
          </>
        )}
        <div className="btn">
          <CurrencyDropdown />
        </div>
        <div className="btn">
          <CountryDropdown />
        </div>
      </div>
    </div>
  );
};
