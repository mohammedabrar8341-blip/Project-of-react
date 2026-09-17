import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) {
    return (
      <main className="order-success-page">
        <h1>Order details are unavailable</h1>
        <button className="place-order-btn" onClick={() => navigate("/")}>Continue Shopping</button>
      </main>
    );
  }

  return (
    <main className="order-success-page">
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Order ID: {order._id}</p>
      <p>Customer Name: {order.customerName}</p>
      <p>Email: {order.customerEmail}</p>
      <h2>Ordered Items</h2>
      <ul>
        {order.items.map((item) => (
          <li key={`${item.restaurantId}-${item.id}`}>
            {item.name} × {item.quantity} — ₹{item.price}
          </li>
        ))}
      </ul>
      <h2>Total Amount: ₹{order.totalAmount}</h2>
      <p>Payment Status: PAID</p>
      <p>Order Status: PLACED</p>
      <p className="payment-note">Demo Payment — payment was simulated for this portfolio project.</p>
      <button className="place-order-btn" onClick={() => navigate("/")}>Continue Shopping</button>
    </main>
  );
};

export default OrderSuccess;