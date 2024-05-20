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

  /* return (
    <div
      className="item-grid"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onAddItem}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 360 360"
        width="100%"
        className="item-grid-svg"
      >
        <defs>
          <clipPath id="clipShape">
            <path
              d="M780,396V684a36,36,0,0,0,36,36h216a36,36,0,0,0,36-36h0a36,36,0,0,1,36-36h0a36,36,0,0,0,36-36V396a36,36,0,0,0-36-36H816A36,36,0,0,0,780,396Z"
              transform="translate(-780 -360)"
            />
          </clipPath>
        </defs>
        <image
          href={item.imageUrl}
          width="100%"
          height="100%"
          clipPath="url(#clipShape)"
          preserveAspectRatio="xMidYMid slice"
        />
        {hover && (
          <g clipPath="url(#clipShape)" className="big-screen-only">
            <rect width="100%" height="100%" fill="#16161640" />
            <text
              x="50%"
              y="50%"
              fill="#f4f3ef"
              fontSize="32"
              dy=".3em"
              textAnchor="middle"
              className="text-shadow"
            >
              {item.name} - {currency ? currencySymbols[currency] : ""}
              {cost.toFixed(0)}
            </text>
          </g>
        )}
        {
          <g clipPath="url(#clipShape)" className="small-screen-only">
            <rect width="100%" height="100%" fill="#16161616" />
            <text
              x="50%"
              y="66%"
              fill="#f4f3ef"
              fontSize="32"
              dy=".3em"
              textAnchor="middle"
              className="text-shadow"
            >
              {item.name} - {currency ? currencySymbols[currency] : ""}
              {cost.toFixed(0)}
            </text>
          </g>
        }
      </svg>
      <div className="item-grid-bottom-right-corner text-shadow text-cost">
        {quantity > 0 && <p className="multiplier">x</p>}
        <h1>{quantity > 0 ? quantity : ""}</h1>
      </div>
    </div>
  ); */

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
        <img src={item.imageUrl} alt="" />
        {/* <image
          href={item.imageUrl}
          width="100%"
          height="100%"
          clipPath="url(#clipShape)"
          preserveAspectRatio="xMidYMid slice"
        /> */}
      </div>
      <div className="item-counter">
        <button onClick={onRemoveItem}>−</button>
        <div>
          <h3>{quantity > 0 ? quantity : ""}</h3>
        </div>
        <button onClick={onAddItem}>+</button>
      </div>
    </div>
  );
};
