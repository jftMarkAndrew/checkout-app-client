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

export const currencySymbols: Record<CurrencyCode, string> = {
  [CurrencyCode.GBP]: CurrencySymbol.GBP,
  [CurrencyCode.USD]: CurrencySymbol.USD,
  [CurrencyCode.EUR]: CurrencySymbol.EUR,
};

export const currencyValues: Record<CurrencyCode, number> = {
  [CurrencyCode.GBP]: 1,
  [CurrencyCode.USD]: 1.25,
  [CurrencyCode.EUR]: 1.16,
};
