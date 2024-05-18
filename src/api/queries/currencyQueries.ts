import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CurrencyCode } from "../../interfaces/Currency";

interface FetchCurrencyResponse {
  currency: CurrencyCode;
}

const fetchCurrency = async (): Promise<CurrencyCode> => {
  const response = await axios.get<FetchCurrencyResponse>(
    "http://localhost:3000/settings/currency"
  );
  return response.data.currency;
};

const updateCurrency = async (
  currency: CurrencyCode
): Promise<CurrencyCode> => {
  const response = await axios.post<FetchCurrencyResponse>(
    "http://localhost:3000/settings/currency",
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

export const useUpdateCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation<CurrencyCode, Error, CurrencyCode>({
    mutationFn: updateCurrency,
    onSuccess: (newCurrency) => {
      queryClient.setQueryData(["currency"], newCurrency);
    },
  });
};
