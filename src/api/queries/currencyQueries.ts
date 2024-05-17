// src/api/queries/currencyQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CurrencySymbol } from "../../interfaces/Currency";
import axios from "axios";

const fetchCurrency = async () => {
  // Assuming you have an endpoint to fetch the initial currency
  const response = await axios.get("/api/currency");
  return response.data.currency;
};

const updateCurrency = async (currency: CurrencySymbol) => {
  // Assuming you have an endpoint to update the currency
  const response = await axios.post("/api/currency", { currency });
  return response.data.currency;
};

export const useCurrency = () => {
  return useQuery(["currency"], fetchCurrency);
};

export const useUpdateCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation(updateCurrency, {
    onSuccess: (newCurrency) => {
      queryClient.setQueryData(["currency"], newCurrency);
    },
  });
};
