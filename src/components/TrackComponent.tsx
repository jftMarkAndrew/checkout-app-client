import { useParams } from "react-router-dom";
import { LogoComponent } from "./LogoComponent";

export const TrackComponent = () => {
  const { orderId } = useParams();

  return (
    <div>
      <LogoComponent />
      <div className="tracking-container">
        <h1>Where is my order?</h1>
        <p>
          You can check the status of your purchase using tracking number you
          received after the successful payment.
        </p>
        {orderId && <div>Tracking Order ID: {orderId}</div>}
      </div>
      {orderId && <div className="tracking-table">table with result</div>}
    </div>
  );
};
