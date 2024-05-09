import { useParams } from "react-router-dom";
import { LogoComponent } from "./LogoComponent";
import { useEffect, useState } from "react";
import { OrderDetails } from "../interfaces/orderDetails";

export const TrackComponent = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId)
        .then((details) => {
          setOrderDetails(details);
        })
        .catch((error) => {
          console.error("Failed to fetch order details:", error);
        });
    }
  }, [orderId]);

  async function fetchOrderDetails(orderId: string) {
    try {
      const response = await fetch(`http://localhost:3000/checkout/${orderId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      throw error;
    }
  }

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
      {orderId && (
        <div className="tracking-table">
          <h1>Order Tracking</h1>
          <p>Order ID: {orderId}</p>
          <p>Data: {}</p>
          {orderDetails && (
            <div>
              <h1>Order Tracking</h1>
              <p>Order ID: {orderDetails.authorizationId || "N/A"}</p>
              <p>Status: {orderDetails.authorizationStatus || "N/A"}</p>
              <p>
                Amount: {orderDetails.amount || "0"}{" "}
                {orderDetails.currency || "N/A"}
              </p>
              <p>Merchant ID: {orderDetails.merchantId || "N/A"}</p>
              <p>Transaction Date: {orderDetails.createdAt || "N/A"}</p>
              {/* Display additional details as needed */}
              <p>Data: {JSON.stringify(orderDetails)}</p>{" "}
              {/* Show the whole object as a string for debugging */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
