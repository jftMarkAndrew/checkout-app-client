export const cardConfig = {
  cardDetails: {
    selector: "#card",
    placeholder: {
      cardNumber: "1234 5678 9012 3456",
      cvv: "CVV",
      expiry: "MM/YY",
    },
  },
  cardHolder: {
    selector: "#cardholder",
    placeholder: "Albert Einstein",
  },
};
export const btnConfig = {
  additionalFields: {
    submitButton: {
      selector: "#submit-payment",
    },
  },
  mode: "test",
};
