import { CurrencyCode } from "../interfaces/CurrencyCode";

export enum Currency {
  GBP = "£",
  USD = "$",
  EUR = "€",
}

export const currencyCodes: CurrencyCode[] = [
  { code: "GBP", symbol: Currency.GBP, approximateValue: 1 },
  { code: "USD", symbol: Currency.USD, approximateValue: 1.25 },
  { code: "EUR", symbol: Currency.EUR, approximateValue: 1.16 },
];
