import { Link } from "react-router-dom";

interface ResultComponentProps {
  orderId: string;
}

export const ResultComponent: React.FC<ResultComponentProps> = ({
  orderId,
}) => {
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
