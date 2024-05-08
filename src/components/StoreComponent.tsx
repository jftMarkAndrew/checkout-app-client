// StoreComponent.tsx
import React from "react";
import { ItemComponent } from "./ItemComponent";

interface StoreComponentProps {
  imageUrls: string[];
  productNames: string[];
  productPricesGBP: number[];
}

export const StoreComponent: React.FC<StoreComponentProps> = ({
  imageUrls,
  productNames,
  productPricesGBP,
}) => {
  return (
    <div className="store-container">
      {imageUrls.map((url, index) => (
        <ItemComponent
          key={index}
          imageUrl={url}
          productName={productNames[index]}
          productPriceGBP={productPricesGBP[index].toFixed(0)}
        />
      ))}
    </div>
  );
};
