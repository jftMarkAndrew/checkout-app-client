import "../styles/tracking.css";
import { useNavigate, useParams } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import { OrderDetail } from "../interfaces/OrderDetail";

export const Track = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetail | null>(null);
  const navigate = useNavigate();
  const [inputOrderId, setInputOrderId] = useState(orderId || "");

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
      return data;
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      throw error;
    }
  }

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputOrderId(e.target.value);
  };

  const handleTrackOrder = () => {
    navigate(`/tracking/${inputOrderId}`);
  };

  return (
    <div className="tracking-container">
      <h1>Where is my order?</h1>
      <p>
        You can check the status of your purchase using the tracking number you
        received after successful payment.
      </p>
      <div>
        <input
          type="text"
          value={inputOrderId}
          onChange={handleInputChange}
          placeholder="Enter your order ID here"
          className="track-order-input"
        />
        <button className="btn-pay" onClick={handleTrackOrder}>
          Track Order
        </button>
      </div>
      {orderDetails && (
        <table className="track-table">
          <tbody>
            <tr>
              <th>Date</th>
              <td>
                {new Date(orderDetails.createdAt).toLocaleDateString("en-GB")}
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                {orderDetails.consumer.email.replace(/^(.{3})[^@]*/, "$1***")}
              </td>
            </tr>
            <tr>
              <th>Card Details</th>
              <td>{`${orderDetails.paymentOption.brand} **** **** **** ${orderDetails.paymentOption.last4digits}`}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{`${orderDetails.amount} ${orderDetails.currency}`}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{orderDetails.consumer.shippingAddress.country}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{orderDetails.authorizationStatus}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
