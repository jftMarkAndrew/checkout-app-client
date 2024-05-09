import { Link } from "react-router-dom";

const orderId = "663c4ff3cc59026bc79bcee9";

export const ResultComponent = () => {
  return (
    <div className="checkout-content">
      <h3 className="big-screen-only">Payment Details</h3>
      <div className="checkout-container">
        <div>
          <p className="text-shadow">
            Congratulations, your order is already on the way!
          </p>
          <p className="text-shadow">
            You can track it using ID on the dedicated page.
          </p>
          <p className="text-shadow">
            <Link to={`/tracking/${orderId}`}>Check it now!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
