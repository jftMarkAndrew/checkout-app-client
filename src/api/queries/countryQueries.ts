// src/api/queries/countryQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CountryCode } from "../../interfaces/CountryCode";

interface FetchCountryResponse {
  country: CountryCode;
}

const fetchCountry = async (): Promise<CountryCode> => {
  const response = await axios.get<FetchCountryResponse>(
    "http://localhost:3000/settings/country"
  );
  return response.data.country;
};

const updateCountry = async (country: CountryCode): Promise<CountryCode> => {
  const response = await axios.post<FetchCountryResponse>(
    "http://localhost:3000/settings/country",
    {
      country,
    }
  );
  return response.data.country;
};

export const useCountry = () => {
  return useQuery<CountryCode, Error>({
    queryKey: ["country"],
    queryFn: fetchCountry,
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
