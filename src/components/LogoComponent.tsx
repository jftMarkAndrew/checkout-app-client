import { Link } from "react-router-dom";
import { Toggle } from "./Toggle";

export const LogoComponent = () => {
  return (
    <div className="logo">
      <Link to="/">
        <div className="logo-unipaas"></div>
      </Link>
      <div className="toggle">
        <Toggle />
      </div>
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
      {/* <div className="menu-container">
        <Link to="/tracking">
          <button className="btn-menu">Track Order</button>
        </Link>
      </div> */}
    </div>
  );
};
