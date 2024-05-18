import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartItem } from "../interfaces/CartItem";
import { Item } from "../interfaces/Item";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  totalQuantity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "cart";

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.product.id === item.id
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.product.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        const productWithDefaultImageUrl: Item = {
          ...item,
          imageUrl: item.imageUrl || "",
        };
        return [
          ...prevCart,
          { product: productWithDefaultImageUrl, quantity: 1 },
        ];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.product.id === itemId
      );
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.product.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter((cartItem) => cartItem.product.id !== itemId);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
