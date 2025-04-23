// src/pages/Checkout.jsx
import React from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();

  const handlePlaceOrder = () => {
    alert("Order placed successfully! 🎉");
    clearCart();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout 💳</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart not loaded or empty. Please try again.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow p-6 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="text-right text-xl font-bold">
            Total: ₹{getTotalPrice()}
          </div>

          <div className="text-right">
            <button
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;