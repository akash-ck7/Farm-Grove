// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import MainLayout from "./layouts/MainLayout";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Tips from "./pages/Tips";
import Contact from "./pages/Contacts";
import Help from "./pages/Help";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster

function App() {
  return (
    <CartProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Add here */}
        <Routes>
          {/* All your routes */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/categories"
            element={
              <MainLayout>
                <Categories />
              </MainLayout>
            }
          />
          <Route
            path="/shop"
            element={
              <MainLayout>
                <Shop />
              </MainLayout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <MainLayout>
                <ProductDetail />
              </MainLayout>
            }
          />
          <Route
            path="/tips"
            element={
              <MainLayout>
                <Tips />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />
          <Route
            path="/help"
            element={
              <MainLayout>
                <Help />
              </MainLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <MainLayout>
                <Cart />
              </MainLayout>
            }
          />
          <Route
            path="/checkout"
            element={
              <MainLayout>
                <Checkout />
              </MainLayout>
            }
          />
          {/* No Navbar/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/registerBuyer" element={<Register userType="Buyer" />} />
          <Route path="/registerSeller" element={<Register userType="Seller" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;