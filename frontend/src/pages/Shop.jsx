import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const categories = ["All", "Fruits", "Vegetables", "Dry-Fruits", "Grains", "Fertilizer"];

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Read category from URL
 // ✅ Read category from URL
 useEffect(() => {
  const params = new URLSearchParams(location.search);
  const categoryParam = params.get("category");

  if (categoryParam) {
    const normalize = (str) => str.toLowerCase().replace(/[-\s]/g, "");
    const matchedCategory = categories.find(
      (cat) => normalize(cat) === normalize(categoryParam)
    );
    setSelectedCategory(matchedCategory || "All");
  } else {
    setSelectedCategory("All");
  }
}, [location.search]);

  // ✅ Filtering logic
  const filteredProducts = products.filter((product) => {
    const normalize = (str) => str.toLowerCase().replace(/[-\s]/g, "");
    const matchCategory =
      selectedCategory === "All" ||
      normalize(product.category) === normalize(selectedCategory);
  
    const price = product.price;
    let matchPrice = true;
    if (priceRange === "0-100") matchPrice = price >= 0 && price <= 100;
    else if (priceRange === "100-500") matchPrice = price > 100 && price <= 500;
    else if (priceRange === "500-1000") matchPrice = price > 500 && price <= 1000;
    else if (priceRange === "1000+") matchPrice = price > 1000;
  
    return matchCategory && matchPrice;
  });
  console.log("Category Filter:",filteredProducts );
  // ✅ Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceLowHigh") return a.price - b.price;
    if (sortOption === "priceHighLow") return b.price - a.price;
    if (sortOption === "nameAZ") return a.name.localeCompare(b.name);
    if (sortOption === "nameZA") return b.name.localeCompare(a.name);
    return 0;
  });

  // ✅ Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Shop All Products</h1>

      {/* 🔽 Filter and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All Prices</option>
          <option value="0-100">₹0 - ₹100</option>
          <option value="100-500">₹100 - ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000+">₹1000+</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="default">Sort by</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="nameAZ">Name: A-Z</option>
          <option value="nameZA">Name: Z-A</option>
        </select>
      </div>

      {/* ✅ Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden p-3 cursor-pointer"
          >
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full z-10">
              {product.badge}
            </div>

            <div
              className="h-48 flex items-center justify-center overflow-hidden bg-white"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.imageUrl} // ✅ fixed here
                alt={product.name}
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-base font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 text-sm mt-1">₹{product.price}.00</p>
              <div className="mt-3 flex justify-between items-center gap-2">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm w-full"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="border border-green-600 text-green-600 px-3 py-1.5 rounded text-sm w-full hover:bg-green-50"
                  onClick={() => handleProductClick(product)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded border text-sm ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded border text-sm ${
                page === currentPage
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded border text-sm ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;