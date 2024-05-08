import { LogoComponent } from "./LogoComponent";
import { StoreComponent } from "./StoreComponent";
import { CheckoutContainer } from "./CheckoutContainer";
import { ResultComponent } from "./ResultComponent";
import { TrackComponent } from "./TrackComponent";
import { DetailsComponent } from "./DetailsComponent";

export const ContainerComponent = () => {
  const imageUrls = [
    "/img/9cfcb320-7cff-4e59-8b9b-cabe568db63e.png",
    "/img/051b6ffb-b70b-4892-95ed-2f55a1e64a5f.png",
    "/img/01461f32-ba2b-45e8-af80-21b37fddb418.png",
    "/img/3460ccdc-63f3-464b-82fd-b9e463df4d93.png",
    "/img/701445a6-910c-4b20-9247-95ce9f43b26e.png",
    "/img/1763841e-201e-4804-a92a-09a7a7f9500a.png",
    "/img/5196116d-39a3-404f-8fd5-5dc4d45766c4.png",
    "/img/05821132-ca9d-4033-ba4b-fdef4adac31c.png",
    "/img/43774504-8456-4e23-93ef-dfd0e5e83939.png",
    "/img/ccd4c26f-4ee2-48de-95c7-c1e8844a1222.png",
    "/img/d752323b-b289-4ab2-bed6-cc5cd58252f1.png",
    "/img/fb00c202-b690-4ab5-9df1-83cb190606f5.png",
  ];

  const productNames = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
  ];

  const productPricesGBP = [
    50, 100, 150, 75, 225, 300, 275, 125, 25, 75, 125, 1000,
  ];

  return (
    <>
      {/* TODO LOGO, NAME, BASCET (link to CheckoutContainer), TRACK ORDER (link to TrackComponent), LIGHT/DARK MODE, PREVIOUS/NEXT BTN */}
      <LogoComponent />
      <StoreComponent
        imageUrls={imageUrls}
        productNames={productNames}
        productPricesGBP={productPricesGBP}
      />
      <CheckoutContainer />
      <ResultComponent />
      <TrackComponent />
      <DetailsComponent />
    </>
  );
};
