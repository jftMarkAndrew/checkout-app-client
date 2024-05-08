interface ItemComponentProps {
  imageUrl: string;
}

export const ItemComponent: React.FC<ItemComponentProps> = ({ imageUrl }) => {
  return (
    <div className="item-grid">
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
      </svg>
      <div className="item-grid-bottom-right-corner"></div>
    </div>
  );
};
