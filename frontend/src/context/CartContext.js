import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0); // ✅ Added

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total); // ✅ Updates totalItems every time cart changes
  }, [cartItems]);

  // ✅ The rest remains same
  const addToCart = (product) => {
    const quantityToAdd = product.quantity !== undefined ? product.quantity : 1;
  
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        toast.success(`Updated quantity of ${product.name}`);
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        toast.success(`${product.name} added to cart`);
        return [...prevItems, { ...product, quantity: quantityToAdd }];
      }
    });
  };

  const removeFromCart = (productId) => {
    const removedItem = cartItems.find((item) => item.id === productId);
    if (removedItem) {
      toast.success(`${removedItem.name} removed from cart`);
    }
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, change) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      const newQuantity = Math.max(item.quantity + change, 1);
      toast.success(`${item.name} quantity: ${newQuantity}`);
    }

    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(item.quantity + change, 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  const getTotalPrice = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        clearCart,
        totalItems, // ✅ Provide this to consumers
      }}
    >
      {children}
    </CartContext.Provider>
  );
};