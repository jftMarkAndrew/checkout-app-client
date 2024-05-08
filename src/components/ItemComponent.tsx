import { useState } from "react";

interface ItemComponentProps {
  imageUrl: string;
  productName: string;
  productPriceGBP: string;
}

export const ItemComponent: React.FC<ItemComponentProps> = ({
  imageUrl,
  productName,
  productPriceGBP,
}) => {
  const [hover, setHover] = useState(false);
  const [addItem, setAddItem] = useState(0);

  const handleAddItem = () => {
    setAddItem(addItem + 1);
  };

  return (
    <div
      className="item-grid"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleAddItem}
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
              {productName} - £{productPriceGBP}
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
              {productName} - £{productPriceGBP}
            </text>
          </g>
        }
      </svg>
      <div className="item-grid-bottom-right-corner text-shadow">
        {addItem > 0 && <p className="multiplier">x</p>}
        <h1>{addItem > 0 ? addItem : ""}</h1>
      </div>
    </div>
  );
};
