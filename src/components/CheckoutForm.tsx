export const CheckoutForm: React.FC = () => {
  return (
    <form className="checkout-form">
      <div className="payment-field">
        <label className="payment-field--cardholder-label">
          Cardholder Name
          <div className="secure-field--container">
            <input type="text" id="cardholder" />
          </div>
        </label>
      </div>

      <div className="payment-field">
        <label className="payment-field--card-label">
          Card Details
          <div className="secure-field--container">
            <div id="card" className="secure-field"></div>
          </div>
        </label>
      </div>

      <div className="payment-field">
        <label htmlFor="card-number">
          Card Number
          <div className="secure-field--container">
            <input type="text" id="card-number" />
          </div>
        </label>
      </div>

      <div className="payment-field">
        <label>
          Expiration Date
          <div className="secure-field--container">
            <input type="text" id="expiry-date" />
          </div>
        </label>
      </div>

      <div className="payment-field">
        <label>
          CVC/CVV
          <div className="secure-field--container">
            <input type="text" id="cvv-number" />
          </div>
        </label>
      </div>

      <div className="payment-checkbox">
        <input type="checkbox" id="save-card" name="save-card" />
        <label htmlFor="save-card">
          Save my credit card details securely for future purchases
        </label>
      </div>

      <button type="submit" id="submit-payment">
        Pay Now
      </button>
    </form>
  );
};
