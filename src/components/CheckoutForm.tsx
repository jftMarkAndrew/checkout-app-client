/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { cardConfig, btnConfig } from "../consts/sdkConfig";
import { Result } from "./Result";
import { ErrorMessage } from "./ErrorMessage";
import { OrderDetail } from "../interfaces/OrderDetail";
import { OrderError } from "../interfaces/OrderError";
import useLocalStorage from "use-local-storage";
import { useCurrencyContext } from "../context/CurrencyContext";

declare global {
  interface Window {
    Unipaas: any;
  }
}

interface CheckoutFormProps {
  sessionToken: string;
  totalAmount: number;
  email: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  sessionToken,
  totalAmount,
  email,
}) => {
  const { currency } = useCurrencyContext();
  const unipaasRef = useRef<any>(null);
  const isInitialized = useRef(false);
  const [checkoutData, setCheckoutData] = useState<OrderDetail | null>(null);
  const [isReadyForSDK, setReadyForSDK] = useState(false);
  const [isSuccessfulPayment, setSuccessfulPayment] = useState(false);
  const [isOrderId, setOrderId] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSaveCardChecked, setIsSaveCardChecked] = useState(false);
  const [consumerPaymentOptionId, setConsumerPaymentOptionId] = useLocalStorage<
    string | null
  >("consumerPaymentOption", null);
  const [consumerCartBrand, setConsumerCartBrand] = useLocalStorage<
    string | null
  >("consumerCartBrand", null);
  const [consumerLast4Digits, setConsumerLast4Digits] = useLocalStorage<
    string | null
  >("consumerLast4Digits", null);
  const [consumerReturningEmail, setConsumerReturningEmail] = useLocalStorage<
    string | null
  >("consumerReturningEmail", null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTokenSuccess = (token: OrderDetail) => {
    console.log("Token received:", token);
    setCheckoutData(token);
    setOrderId(token.authorizationId);
    setSuccessfulPayment(true);
  };

  const handleSubmission = (data: OrderDetail) => {
    console.log("Form submission detected", data);
  };

  const handleSuccess = (data: OrderDetail) => {
    setCheckoutData(data);
    setOrderId(data.authorizationId);
    setSuccessfulPayment(true);
  };

  const handleError = (error: OrderError) => {
    setErrorMsg(error.processor.processorDescription);
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

  const loadSDK = () => {
    const script = document.createElement("script");
    script.src = "https://cdn.unipaas.com/unipaas.sdk.js";
    script.onload = initializeSDK;
    script.onerror = () => {
      console.error("Failed to load Unipaas SDK.");
      setTimeout(loadSDK, 5000);
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  };

  const initializeSDK = () => {
    if (window.Unipaas && !isInitialized.current && !isReadyForSDK) {
      const unipaas = new window.Unipaas();
      unipaas.usePolyfills();
      unipaas.initTokenize(sessionToken, cardConfig, btnConfig);
      unipaas.on("OnTokenSuccess", handleTokenSuccess);
      unipaas.on("onSubmission", handleSubmission);
      unipaas.on("onSuccess", handleSuccess);
      unipaas.on("onError", handleError);
      unipaasRef.current = unipaas;
      isInitialized.current = true;
      setReadyForSDK(true);
    }
  };

  useEffect(() => {
    if (!window.Unipaas || !isInitialized.current) {
      loadSDK();
    }
  }, [sessionToken]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSaveCardChecked(event.target.checked);
  };

  const storeConsumerPaymentOptionId = () => {
    if (checkoutData) {
      if (isSaveCardChecked) {
        setConsumerPaymentOptionId(checkoutData.paymentOption.paymentOptionId);
        setConsumerCartBrand(checkoutData.paymentOption.brand);
        setConsumerLast4Digits(checkoutData.paymentOption.last4digits);
        setConsumerReturningEmail(email);
      }
      setSuccessfulPayment(true);
    }
  };

  const makePaymentWithSavedCardFlow = () => {
    setIsProcessing(true);
    unipaasRef.current.payWithToken(sessionToken, {
      mode: "test",
    });
    unipaasRef.current.makePayment(consumerPaymentOptionId).finally(() => {
      setIsProcessing(false);
    });
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
    storeConsumerPaymentOptionId();
  });

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
          <h3 className="payment-amount">Payment Details</h3>
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
                <input
                  type="checkbox"
                  id="save-card"
                  name="save-card"
                  checked={isSaveCardChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="save-card">
                  Save my credit card details securely for future purchases
                </label>
              </div>
              <div className="btn-container">
                <h3>
                  Payment Amount:{" "}
                  <span className="payment-amount">
                    {totalAmount.toFixed(0)}
                    {currency}
                  </span>
                </h3>
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
                {consumerPaymentOptionId &&
                  consumerCartBrand &&
                  consumerLast4Digits &&
                  consumerReturningEmail === email && (
                    <h3 className="text-or">or</h3>
                  )}
                {consumerPaymentOptionId &&
                  consumerCartBrand &&
                  consumerLast4Digits &&
                  consumerReturningEmail === email && (
                    <button
                      type="button"
                      className={
                        isProcessing || isSuccessfulPayment
                          ? "btn-disabled"
                          : "btn-pay"
                      }
                      disabled={isProcessing || isSuccessfulPayment}
                      onClick={() => makePaymentWithSavedCardFlow()}
                    >
                      {isProcessing ? (
                        <>
                          <span className="dots">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                          </span>
                        </>
                      ) : (
                        `Pay with ${consumerCartBrand} ${consumerLast4Digits}`
                      )}
                    </button>
                  )}
              </div>
            </form>
          </div>
          <div className="error-container">
            {showError && <ErrorMessage errorType={errorMsg} />}
          </div>
        </div>
      )}
      {isSuccessfulPayment && <Result orderId={isOrderId} />}
    </div>
  );
};
