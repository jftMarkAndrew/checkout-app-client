import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CountryCode } from "../../interfaces/CountryCode";

axios.defaults.baseURL = "http://localhost:3000";

interface FetchCountryResponse {
  country: CountryCode;
}

const fetchCountry = async (): Promise<CountryCode> => {
  const response = await axios.get<FetchCountryResponse>("/settings/country");
  return response.data.country;
};

const fetchCountries = async (): Promise<CountryCode[]> => {
  const response = await axios.get<CountryCode[]>("/settings/countries");
  return response.data;
};

const updateCountry = async (country: CountryCode): Promise<CountryCode> => {
  const response = await axios.post<FetchCountryResponse>("/settings/country", {
    country,
  });
  return response.data.country;
};

export const useCountry = () => {
  return useQuery<CountryCode, Error>({
    queryKey: ["country"],
    queryFn: fetchCountry,
  });
};

export const useCountries = () => {
  return useQuery<CountryCode[], Error>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
};

export const useUpdateCountry = () => {
  const queryClient = useQueryClient();

  return useMutation<CountryCode, Error, CountryCode>({
    mutationFn: updateCountry,
    onSuccess: (newCountry) => {
      queryClient.setQueryData(["country"], newCountry);
    },
  });
};
