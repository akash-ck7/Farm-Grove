// src/components/ProductSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import products from "../dummyData/mockProducts.js"; // adjust path as needed

const ProductSection = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Explore Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="cursor-pointer border rounded-lg p-4 hover:shadow-xl transition-all bg-white relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg w-full h-48 object-cover mb-2 transform hover:scale-105 transition duration-300"
            />
            <h4 className="text-lg font-semibold">{product.name}</h4>
            <p className="text-green-600">₹{product.price}/kg</p>
            {product.badge && (
              <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
                {product.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;