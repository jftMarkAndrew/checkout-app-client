import { LogoComponent } from "./LogoComponent";
import { StoreComponent } from "./StoreComponent";
import { CheckoutContainer } from "./CheckoutContainer";
import { ResultComponent } from "./ResultComponent";
import { TrackComponent } from "./TrackComponent";
import { DetailsComponent } from "./DetailsComponent";

export const ContainerComponent = () => {
  return (
    <>
      {/* TODO LOGO, NAME, BASCET (link to CheckoutContainer), TRACK ORDER (link to TrackComponent), LIGHT/DARK MODE, PREVIOUS/NEXT BTN */}
      <LogoComponent />
      <StoreComponent />
      <CheckoutContainer />
      <ResultComponent />
      <TrackComponent />
      <DetailsComponent />
    </>
  );
};
