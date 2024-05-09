export interface PaymentOption {
  bin: string;
  brand: string;
  expMonth: string;
  expYear: string;
  last4digits: string;
  paymentOptionId: string;
  payment_option_type: string;
}

export interface Processor {
  processorAuthCode: string;
  processorDescription: string;
  processorErrorCode: number;
  processorTransactionId: string;
}

export interface OrderError {
  authorizationId: string;
  authorizationStatus: string;
  consumerId: string;
  currency: string;
  declineCode: string;
  items: [];
  orderid: string;
  paymentOption: PaymentOption;
  processor: Processor;
  sellerIdentity: string;
  status: string;
  threeD: {
    version: string;
    redirectUrl: string;
  };
  transactionAmount: number;
  transactionId: string;
  transactionStatus: string;
  transactionType: string;
}
