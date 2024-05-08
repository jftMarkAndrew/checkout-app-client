import { ItemComponent } from "./ItemComponent";

interface StoreComponentProps {
  imageUrls: string[];
}

export const StoreComponent: React.FC<StoreComponentProps> = ({
  imageUrls,
}) => {
  return (
    <div className="store-container">
      {imageUrls.map((url, index) => (
        <ItemComponent key={index} imageUrl={url} />
      ))}
    </div>
  );
};
