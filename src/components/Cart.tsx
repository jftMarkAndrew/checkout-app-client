import { useCartContext } from "../context/CartContext";
import { useCurrencyContext } from "../context/CurrencyContext";
import { currencySymbols } from "../consts/currencyCodes";

export const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCartContext();
  const { currency } = useCurrencyContext();

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((cartItem) => (
              <li key={cartItem.product.id}>
                <span>
                  {cartItem.product.name} -{" "}
                  {currency ? currencySymbols[currency] : ""}
                  {cartItem.product.defaultAmount.toFixed(2)}
                </span>
                <span>Quantity: {cartItem.quantity}</span>
                <button onClick={() => removeFromCart(cartItem.product.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};
