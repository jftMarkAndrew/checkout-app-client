import { useEffect, useRef, useState } from "react";
import { cardConfig, btnConfig } from "../consts/sdkConfig";
import { ResultComponent } from "./ResultComponent";
import { ErrorMessageComponent } from "./ErrorMessageComponent";
import { OrderDetail } from "../interfaces/OrderDetail";
import { OrderError } from "../interfaces/OrderError";

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
  const [errorMsg, setErrorMsg] = useState("");

  const handleTokenSuccess = (token: OrderDetail) => {
    console.log("Token received:", token);
  };

  const handleSubmission = (data: OrderDetail) => {
    console.log("Form submission detected", data);
  };

  const handleSuccess = (data: OrderDetail) => {
    setOrderId(data.authorizationId);
    setSuccessfulPayment(true);
  };

  const handleError = (error: OrderError) => {
    setErrorMsg(error.processor.processorDescription);
    setShowError(true);

    const timer = setTimeout(() => {
      setShowError(false);
    }, 5000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const checkElements = () => {
      if (
        document.getElementById("payment-form") &&
        document.getElementById("cardholder") &&
        document.getElementById("card") &&
        document.getElementById("save-card") &&
        document.getElementById("submit-payment")
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
  }, [sessionToken, isInitialized, isReadyForSDK]);

  return (
    <div className="checkout-container">
      <div className="checkout-content big-screen-only">
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
            {showError && <ErrorMessageComponent errorType={errorMsg} />}
          </div>
        </div>
      )}
      {isSuccessfulPayment && <ResultComponent orderId={isOrderId} />}
    </div>
  );
};
