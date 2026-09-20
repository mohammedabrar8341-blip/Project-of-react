import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../utlis/CartContext";

const Payment = () => {
  const {
    cartItems,
    totalItems,
    totalAmount,
    checkoutCustomer,
    clearCart,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const completeDemoPayment = async () => {
    if (!cartItems.length) {
      navigate("/cart");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: checkoutCustomer.customerName,
          customerEmail: checkoutCustomer.customerEmail,
          items: cartItems,
          totalItems,
          totalAmount,
          paymentMethod: "phonepe",
          paymentStatus: "PAID",
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not place order");

      clearCart();
      navigate("/order-success", {
        state: {
          order: {
            ...data.order,
            paymentStatus: "PAID",
            orderStatus: "PLACED",
          },
        },
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!cartItems.length) {
    return <div className="payment-page"><h1>Your cart is empty</h1></div>;
  }

  return (
    <main className="payment-page">
      <h1>Payment</h1>
      <h2>Order Total: ₹{totalAmount}</h2>
      <section className="payment-card">
        <h2>Demo Payment</h2>
        <p>Payment is simulated for this project.</p>
        <h3>Scan &amp; Pay using PhonePe</h3>
        <img
          className="phonepe-qr"
          src="/assets/phonepe-qr.png"
          alt="PhonePe payment QR code"
        />
        <p className="payment-note">
          This button records only your confirmation. It does not verify a PhonePe transaction.
        </p>
        <label className="payment-confirmation">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
          />
          I have completed payment
        </label>
        <button
          className="place-order-btn"
          type="button"
          disabled={!confirmed || submitting}
          onClick={completeDemoPayment}
        >
          {submitting ? "Placing order..." : "I Have Completed Payment"}
        </button>
        {error && <p className="order-error">{error}</p>}
      </section>
    </main>
  );
};

export default Payment;