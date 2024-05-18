import { useEffect, useState } from "react";
import { CurrencyCode } from "../interfaces/Currency";
import { currencyCodes, currencySymbols } from "../consts/currencyCodes";
import { useCurrencyContext } from "../context/CurrencyContext";

interface ItemProps {
  imageUrl: string;
  productName: string;
  productPriceGBP: string;
  quantity: number;
  onAddItem: () => void;
}

export const Item: React.FC<ItemProps> = ({
  imageUrl,
  productName,
  productPriceGBP,
  quantity,
  onAddItem,
}) => {
  const { currency } = useCurrencyContext();
  const [hover, setHover] = useState(false);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    return currency === CurrencyCode.GBP
      ? setCost(+productPriceGBP)
      : currency === CurrencyCode.USD
      ? setCost(+productPriceGBP * currencyCodes[1].approximateValue)
      : setCost(+productPriceGBP * currencyCodes[2].approximateValue);
  }, [currency, productPriceGBP]);

  return (
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
          href={imageUrl}
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
              {productName} - {currency ? currencySymbols[currency] : ""}
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
              {productName} - {currency ? currencySymbols[currency] : ""}
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
  );
};
