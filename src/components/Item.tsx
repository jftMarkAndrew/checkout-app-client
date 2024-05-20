import { useEffect, useState } from "react";
import { Item as ItemType } from "../interfaces/Item";
import { useCurrencyContext } from "../context/CurrencyContext";
import { currencySymbols, currencyValues } from "../consts/currencyCodes";

interface ItemProps {
  item: ItemType;
  quantity: number;
  onAddItem: () => void;
  onRemoveItem: () => void;
}

export const Item: React.FC<ItemProps> = ({
  item,
  quantity,
  onAddItem,
  onRemoveItem,
}) => {
  const { currency } = useCurrencyContext();
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const convertPrice = () => {
      const conversionRate = currencyValues[currency];
      return item.amount * conversionRate;
    };
    setCost(convertPrice());
  }, [currency, item.amount]);

  return (
    <div className="item-container">
      <div className="item-title">
        <h1>{item.name}</h1>
        <h3>
          {currency ? currencySymbols[currency] : ""}
          {cost.toFixed(0)}
        </h3>
      </div>
      <div>
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <div className="item-counter">
        <button onClick={onRemoveItem} disabled={quantity === 0}>
          −
        </button>
        <h3>{quantity > 0 ? quantity : 0}</h3>
        <button onClick={onAddItem}>+</button>
      </div>
    </div>
  );
};
