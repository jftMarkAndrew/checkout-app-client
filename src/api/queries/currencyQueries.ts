import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Currency, CurrencyCode } from "../../interfaces/Currency";

axios.defaults.baseURL = "http://localhost:3000";

interface FetchCurrencyResponse {
  currency: CurrencyCode;
}

const fetchCurrency = async (): Promise<CurrencyCode> => {
  const response = await axios.get<FetchCurrencyResponse>("/settings/currency");
  return response.data.currency;
};

const fetchCurrencies = async (): Promise<Currency[]> => {
  const response = await axios.get<Currency[]>("/settings/currencies");
  return response.data;
};

const updateCurrency = async (
  currency: CurrencyCode
): Promise<CurrencyCode> => {
  const response = await axios.post<FetchCurrencyResponse>(
    "/settings/currency",
    { currency }
  );
  return response.data.currency;
};

export const useCurrency = () => {
  return useQuery<CurrencyCode, Error>({
    queryKey: ["currency"],
    queryFn: fetchCurrency,
  });
};

export const useCurrencies = () => {
  return useQuery<Currency[], Error>({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
  });
};

export const useUpdateCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation<CurrencyCode, Error, CurrencyCode>({
    mutationFn: updateCurrency,
    onSuccess: (newCurrency) => {
      queryClient.setQueryData(["currency"], newCurrency);
    },
  });
};
