import React, { useEffect, useRef } from "react";
import { cardConfig, btnConfig } from "../consts/sdkConfig";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Unipaas: any;
  }
}

interface CheckoutFormProps {
  sessionToken: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ sessionToken }) => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      const script = document.createElement("script");
      script.src = "https://cdn.unipaas.com/unipaas.sdk.js";
      script.onload = () => {
        if (window.Unipaas && !hasInitialized.current) {
          const unipaas = new window.Unipaas();
          unipaas.usePolyfills();
          unipaas.initTokenize(sessionToken, cardConfig, btnConfig);
          hasInitialized.current = true;
        }
      };
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [sessionToken]);

  return (
    <div className="container">
      <div className="content">
        <div className="main-card"></div>
      </div>
      <div className="content">
        <h3>Payment Details</h3>
        <div className="container">
          <form id="payment-form">
            <div className="payment-field">
              <label className="payment-field--cardholder-label">
                Cardholder Name
                <div className="secure-field--container" id="cardholder"></div>
              </label>
            </div>
            <div className="payment-field">
              <label className="payment-field--card-label">
                Card Details
                <div id="card"></div>
              </label>
            </div>
            <div className="payment-checkbox">
              <input type="checkbox" id="save-card" name="save-card" />
              <label htmlFor="save-card">
                Save my credit card details securely for future purchases
              </label>
            </div>
            <div className="btn-container">
              <button type="button" id="submit-payment" className="btn-pay">
                Pay now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
