export interface DeviceDetails {
  id: string;
  deviceType: string;
  deviceOs: string;
  browser: string;
  ipAddress: string;
  acceptHeader: string;
  colorDepth: string;
  javaEnabled: string;
  javaScriptEnabled: string;
  browserLanguage: string;
  screenHeight: number;
  screenWidth: number;
  timeZone: string;
  userAgent: string;
}

export interface Consumer {
  consumerId: string;
  phone: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  shippingAddress: {
    city: string;
    country: string;
    line2: string;
    line1: string;
    postalCode: string;
  };
}

export interface PaymentOption {
  paymentOptionId: string;
  paymentOptionType: string;
  paymentFlow: string;
  brand: string;
  expirationYear: string;
  expirationMonth: string;
  bin: string;
  issuerCountry: string;
  nameOnCard: string;
  last4digits: string;
}

export interface Transaction {
  id: string;
  authorizationId: string;
  paymentOptionId: string;
  paymentOptionType: string;
  merchantId: string;
  sellerId: string;
  country: string;
  issuerCountry: string;
  paymentMethod: string;
  brand: string;
  transactionType: string;
  type: string;
  currency: string;
  amount: number;
  orderid: string;
  transactionResult: string;
  processorTransactionId: string;
  last4digits: string;
  program: string;
  fundsFlow: string;
  items: [];
  reconciled: boolean;
  reconciliationStatus: string;
  correlationId: string;
  createdAt: string;
  updatedAt: string;
  identificationReference: string;
  processorAuthCode: string;
  processorId: string;
}

export interface OrderDetail {
  authorizationId: string;
  authorizationStatus: string;
  merchantId: string;
  currency: string;
  amount: number;
  orderId: string;
  deviceDetails: DeviceDetails;
  items: [];
  threeDversion: string;
  merchantName: string;
  consumer: Consumer;
  paymentOption: PaymentOption;
  authentication: {
    isLiabilityShift: string;
    threeDversion: string;
  };
  transactions: Transaction[];
  createdAt: string;
  updatedAt: string;
  pos: null | string;
}
