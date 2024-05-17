import { Currency, CurrencyCode, CurrencySymbol } from "../interfaces/Currency";

export const currencyCodes: Currency[] = [
  { code: CurrencyCode.GBP, symbol: CurrencySymbol.GBP, approximateValue: 1 },
  {
    code: CurrencyCode.USD,
    symbol: CurrencySymbol.USD,
    approximateValue: 1.25,
  },
  {
    code: CurrencyCode.EUR,
    symbol: CurrencySymbol.EUR,
    approximateValue: 1.16,
  },
];
