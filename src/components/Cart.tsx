import { useCartContext } from "../context/CartContext";
import { useCurrencyContext } from "../context/CurrencyContext";
import { currencySymbols, currencyValues } from "../consts/currencyCodes";

export const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCartContext();
  const { currency } = useCurrencyContext();

  const getTotalPrice = () => {
    return cart
      .reduce((total, cartItem) => {
        const price = cartItem.product.defaultAmount * currencyValues[currency];
        return total + price * cartItem.quantity;
      }, 0)
      .toFixed(2);
  };

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
                  {(
                    cartItem.product.defaultAmount * currencyValues[currency]
                  ).toFixed(2)}
                </span>
                <span>Quantity: {cartItem.quantity}</span>
                <button onClick={() => removeFromCart(cartItem.product.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div>
            <strong>
              Total: {currency ? currencySymbols[currency] : ""}
              {getTotalPrice()}
            </strong>
          </div>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};
