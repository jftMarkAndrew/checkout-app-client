import { useEffect, useRef, useState } from "react";
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
  const isInitialized = useRef(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleTokenSuccess = (token: unknown) => {
    console.log("Token received:", token);
  };

  const handleSubmission = (data: unknown) => {
    console.log("Form submission detected", data);
  };

  const handleSuccess = (data: unknown) => {
    console.log("Payment successful. DATA: ", data);
    setIsButtonDisabled(true);
  };

  const handleError = (error: unknown) => {
    console.log("Payment error:", error);
  };

  useEffect(() => {
    if (!isInitialized.current) {
      const script = document.createElement("script");
      script.src = "https://cdn.unipaas.com/unipaas.sdk.js";
      script.onload = () => {
        if (window.Unipaas && !isInitialized.current) {
          const unipaas = new window.Unipaas();
          unipaas.usePolyfills();
          unipaas.initTokenize(sessionToken, cardConfig, btnConfig);

          unipaas.on("OnTokenSuccess", handleTokenSuccess);
          unipaas.on("onSubmission", handleSubmission);
          unipaas.on("onSuccess", handleSuccess);
          unipaas.on("onError", handleError);

          isInitialized.current = true;
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
        <h3 className="big-screen-only">Payment Details</h3>
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
              <button
                type="button"
                id="submit-payment"
                className={isButtonDisabled ? "btn-disabled" : "btn-pay"}
                disabled={isButtonDisabled}
              >
                Pay now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
