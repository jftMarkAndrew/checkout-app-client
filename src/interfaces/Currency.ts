export enum CurrencyCode {
  GBP = "GBP",
  USD = "USD",
  EUR = "EUR",
}

export enum CurrencySymbol {
  GBP = "£",
  USD = "$",
  EUR = "€",
}

export interface Currency {
  code: CurrencyCode;
  symbol: CurrencySymbol;
  approximateValue: number;
}
