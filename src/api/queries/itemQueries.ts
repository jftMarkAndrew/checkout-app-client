import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Item } from "../../interfaces/Item";

axios.defaults.baseURL = "http://localhost:3000";

const fetchItems = async (): Promise<Item[]> => {
  const response = await axios.get<Item[]>("/items");
  return response.data;
};

const updateItem = async (item: Item): Promise<Item> => {
  const response = await axios.put<Item>(`/items/${item.id}`, item);
  return response.data;
};

export const useItems = () => {
  return useQuery<Item[], Error>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation<Item, Error, Item>({
    mutationFn: updateItem,
    onSuccess: (updatedItem) => {
      queryClient.setQueryData<Item[]>(["items"], (oldItems = []) => {
        return oldItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
      });
    },
  });
};
