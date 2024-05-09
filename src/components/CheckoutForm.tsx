import { useEffect, useRef, useState } from "react";
import { cardConfig, btnConfig } from "../consts/sdkConfig";
import { ResultComponent } from "./ResultComponent";
import { ErrorMessageComponent } from "./ErrorMessageComponent";

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
  const [isReadyForSDK, setReadyForSDK] = useState(false);
  const [isSuccessfulPayment, setSuccessfulPayment] = useState(false);
  const [isOrderId, setOrderId] = useState("");
  const [showError, setShowError] = useState(false);

  const handleTokenSuccess = (token: unknown) => {
    console.log("Token received:", token);
  };

  const handleSubmission = (data: unknown) => {
    console.log("Form submission detected", data);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccess = (data: any) => {
    setOrderId(data.authorizationId);
    setSuccessfulPayment(true);
  };

  const handleError = (error: unknown) => {
    console.log("Payment error:", error);
    setShowError(true);

    const timer = setTimeout(() => {
      setShowError(false);
    }, 2500);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const checkElements = () => {
      if (
        document.getElementById("cardholder") &&
        document.getElementById("card")
      ) {
        setReadyForSDK(true);
      } else {
        setTimeout(checkElements, 1000);
      }
    };
    checkElements();
  }, []);

  useEffect(() => {
    if (isReadyForSDK && !isInitialized.current) {
      const script = document.createElement("script");
      script.src = "https://cdn.unipaas.com/unipaas.sdk.js";
      script.onload = () => {
        if (window.Unipaas) {
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
  }, [sessionToken, isReadyForSDK]);

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-design-card">
          <img
            src="/src/assets/icons/fav_icon_logo_unipaas.svg"
            width={256}
            height={256}
            alt="UNIPaaS"
            className="checkout-unipaas"
          />
        </div>
      </div>
      {!isSuccessfulPayment && (
        <div className="checkout-content">
          <h3 className="big-screen-only">Payment Details</h3>
          <div className="checkout-container">
            <form id="payment-form">
              <div className="payment-field">
                <label className="payment-field--cardholder-label">
                  Cardholder Name
                  <div
                    className="secure-field--container"
                    id="cardholder"
                  ></div>
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
                  className={isSuccessfulPayment ? "btn-disabled" : "btn-pay"}
                  disabled={isSuccessfulPayment}
                >
                  Pay now
                </button>
              </div>
            </form>
          </div>
          <div className="error-container">
            {showError && <ErrorMessageComponent />}
          </div>
        </div>
      )}
      {isSuccessfulPayment && <ResultComponent orderId={isOrderId} />}
    </div>
  );
};
