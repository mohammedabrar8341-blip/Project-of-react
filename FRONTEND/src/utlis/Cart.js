import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { image_URL } from "./Links";
import CartContext from "./CartContext";

export const Carts = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalItems,
    totalAmount,
    checkoutCustomer,
    setCheckoutCustomer,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const submitCheckout = (event) => {
    event.preventDefault();
    setCheckoutCustomer({
      customerName: event.currentTarget.customerName.value,
      customerEmail: event.currentTarget.customerEmail.value,
    });
    navigate("/payment");
  };

  return (
    <div className="page-container">
      <h1 className="page-title">🛒 Your Cart</h1>
      <div className="page-content">
        {!cartItems.length ? (
          <p>Your cart is empty. Browse restaurants and add items to your cart.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="cart-item" key={`${item.restaurantId}-${item.id}`}>
                {item.imageId && (
                  <img
                    src={image_URL + item.imageId}
                    alt={item.name}
                    className="menu-item-img"
                  />
                )}
                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span> {item.quantity} </span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
            <h3>Total items: {totalItems}</h3>
            <h3>Total amount: ₹{totalAmount}</h3>

            <form className="checkout-form" onSubmit={submitCheckout}>
              <h2>Checkout</h2>
              <input
                required
                name="customerName"
                placeholder="Your name"
                defaultValue={checkoutCustomer.customerName}
              />
              <input
                required
                name="customerEmail"
                type="email"
                placeholder="Your email"
                defaultValue={checkoutCustomer.customerEmail}
              />
              <button className="place-order-btn" type="submit">
                Continue to payment
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
