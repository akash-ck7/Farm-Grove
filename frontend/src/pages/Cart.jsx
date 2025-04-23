// src/pages/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart 🛒</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price ?? 0}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  className="px-2 py-1 text-lg bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
                <span className="text-lg">{item.quantity ?? 1}</span>
                <button
                  className="px-2 py-1 text-lg bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-lg font-medium">
                  ₹{(item.price ?? 0) * (item.quantity ?? 1)}
                </p>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right text-xl font-semibold">
            Total: ₹{getTotalPrice()}
          </div>
          <div className="text-right">
            <button
              className="mt-4 px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;