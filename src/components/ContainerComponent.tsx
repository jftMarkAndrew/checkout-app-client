import { useState } from "react";
import { LogoComponent } from "./LogoComponent";
import { StoreComponent } from "./StoreComponent";
import { CheckoutContainer } from "./CheckoutContainer";
import { ResultComponent } from "./ResultComponent";
import { TrackComponent } from "./TrackComponent";
import { DetailsComponent } from "./DetailsComponent";

export type Product = {
  id: number;
  name: string;
  priceGBP: number;
  imageUrl: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "One",
    priceGBP: 50,
    imageUrl: "/img/9cfcb320-7cff-4e59-8b9b-cabe568db63e.png",
  },
  {
    id: 2,
    name: "Two",
    priceGBP: 100,
    imageUrl: "/img/051b6ffb-b70b-4892-95ed-2f55a1e64a5f.png",
  },
  {
    id: 3,
    name: "Three",
    priceGBP: 150,
    imageUrl: "/img/01461f32-ba2b-45e8-af80-21b37fddb418.png",
  },
  {
    id: 4,
    name: "Four",
    priceGBP: 75,
    imageUrl: "/img/3460ccdc-63f3-464b-82fd-b9e463df4d93.png",
  },
  {
    id: 5,
    name: "Five",
    priceGBP: 225,
    imageUrl: "/img/701445a6-910c-4b20-9247-95ce9f43b26e.png",
  },
  {
    id: 6,
    name: "Six",
    priceGBP: 300,
    imageUrl: "/img/1763841e-201e-4804-a92a-09a7a7f9500a.png",
  },
  {
    id: 7,
    name: "Seven",
    priceGBP: 275,
    imageUrl: "/img/5196116d-39a3-404f-8fd5-5dc4d45766c4.png",
  },
  {
    id: 8,
    name: "Eight",
    priceGBP: 125,
    imageUrl: "/img/05821132-ca9d-4033-ba4b-fdef4adac31c.png",
  },
  {
    id: 9,
    name: "Nine",
    priceGBP: 25,
    imageUrl: "/img/43774504-8456-4e23-93ef-dfd0e5e83939.png",
  },
  {
    id: 10,
    name: "Ten",
    priceGBP: 75,
    imageUrl: "/img/ccd4c26f-4ee2-48de-95c7-c1e8844a1222.png",
  },
  {
    id: 11,
    name: "Eleven",
    priceGBP: 125,
    imageUrl: "/img/d752323b-b289-4ab2-bed6-cc5cd58252f1.png",
  },
  {
    id: 12,
    name: "Twelve",
    priceGBP: 1000,
    imageUrl: "/img/fb00c202-b690-4ab5-9df1-83cb190606f5.png",
  },
];

export const ContainerComponent = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  return (
    <>
      {/* TODO LOGO, NAME, BASCET (link to CheckoutContainer), TRACK ORDER (link to TrackComponent), LIGHT/DARK MODE, PREVIOUS/NEXT BTN */}
      <LogoComponent />
      <StoreComponent
        products={products}
        cart={cart}
        onAddToCart={handleAddToCart}
      />
      <CheckoutContainer cart={cart} />
      <ResultComponent />
      <TrackComponent />
      <DetailsComponent />
    </>
  );
};
