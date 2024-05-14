import { Link } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";

interface ResultProps {
  orderId: string;
}

export const Result: React.FC<ResultProps> = ({ orderId }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      console.log("Copied to Clipboard!");
    } catch (err) {
      console.log("Failed to copy!");
    }
  };
  return (
    <div className="checkout-content">
      <h3 className="big-screen-only">Payment Details</h3>
      <div className="description-container">
        <div>
          <p className="text-shadow">
            Congratulations, your order is already on the way!
          </p>
          <p className="text-shadow">
            You can track it using ID on the{" "}
            <Link to={`/tracking/`} target="_blank">
              dedicated page
            </Link>
            .
          </p>
        </div>
        <div>
          <div className="btn-container">
            <div>
              <h3 className="text-or">Save</h3>
              <input
                type="text"
                value={orderId}
                className="track-order-input"
              />
              <MdContentCopy className="copy-to-clipboard" onClick={handleCopy} />
            </div>
            <div>
              <h3 className="text-or">or</h3>
              <Link to={`/tracking/${orderId}`} target="_blank">
                <button className="btn-pay">Check It Now!</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
