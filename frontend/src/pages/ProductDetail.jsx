// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        console.log(product);
       
        setQuantity(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity });
    setQuantity(1);
    console.log("Product added to cart:", product);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart({ ...product, quantity });
    navigate("/cart");
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  if (!product) {
    return <div className="text-center mt-10 text-xl text-red-600">❌ Product not found.</div>;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-4 rounded-xl shadow-xl">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={product.imageUrl} // ✅ fix image loading
            alt={product.name}
            className="w-80 h-80 object-cover rounded-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-green-600 text-xl mt-2">₹{product.price}/kg</p>
          <p className="mt-2">{product.description}</p>

          {/* Quantity Controls */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleBuyNow}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold text-lg mb-2">Delivery Info</h2>
          <p>🚚 Delivery in 2-3 days</p>
          <p>💳 COD Available</p>
          <hr className="my-3" />
          <h2 className="font-semibold text-lg mb-2">Seller Info</h2>
          <p>⭐ Rating: {product.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;