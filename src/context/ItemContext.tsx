import { createContext, useContext, ReactNode } from "react";
import { useItems, useUpdateItem } from "../api/queries/itemQueries";
import { Item } from "../interfaces/Item";

interface ItemContextType {
  items: Item[];
  updateItem: (item: Item) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: items, isLoading, error } = useItems();
  const { mutate: updateItem } = useUpdateItem();

  if (isLoading) return <div>Loading...</div>;
  if (error || !items) return <div>Error loading items</div>;

  return (
    <ItemContext.Provider value={{ items, updateItem }}>
      {children}
    </ItemContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }
  return context;
};
