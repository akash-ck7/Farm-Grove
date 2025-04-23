import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useState, useContext } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext"; // ✅ Adjust path if needed
import { useCart } from "../context/CartContext"; // adjust the path if needed

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { totalItems } = useCart();// ✅ Get total items from context

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white shadow-md font-sans"
    >
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl md:text-3xl font-bold text-green-700">
          Farm Grove
        </Link>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaTimes className="text-2xl text-green-700" />
            ) : (
              <FaBars className="text-2xl text-green-700" />
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-full border border-green-500 w-2/5 shadow-sm">
          <FaSearch className="text-green-500 mr-3 text-xl" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full outline-none bg-transparent text-lg"
          />
          <button className="ml-2 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all text-lg">
            Search
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6 text-lg font-medium">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="hover:text-green-600 transition-all"
            >
              Register
            </button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-2 w-36 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden z-50"
              >
                <Link
                  to="/registerSeller"
                  className="block px-5 py-2 hover:bg-gray-100 transition-all"
                  onClick={() => setDropdownOpen(false)}
                >
                  Seller
                </Link>
                <Link
                  to="/registerBuyer"
                  className="block px-5 py-2 hover:bg-gray-100 transition-all"
                  onClick={() => setDropdownOpen(false)}
                >
                  Buyer
                </Link>
              </motion.div>
            )}
          </div>

          <Link to="/login" className="hover:text-green-600 transition-all">
            Login
          </Link>

          {/* ✅ Cart with live item count */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-green-600 transition-all"
          >
            <HiOutlineShoppingCart className="text-3xl" />
            {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
          {totalItems}
        </span>
      )}
          </Link>
        </div>
      </div>

      <div className="md:hidden px-4 pb-4">
        <div className="flex items-center bg-white px-4 py-2 rounded-full border border-green-500 shadow-sm">
          <FaSearch className="text-green-500 mr-3 text-xl" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full outline-none bg-transparent text-base"
          />
          <button className="ml-2 px-4 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all text-sm">
            Search
          </button>
        </div>
      </div>

      <nav className="bg-green-500 text-white text-lg font-medium">
        <ul className="hidden md:flex justify-center gap-8 py-3">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/categories" className="hover:underline">Categories</Link></li>
          <li><Link to="/shop" className="hover:underline">Shop</Link></li>
          <li><Link to="/tips" className="hover:underline">Tips</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          <li><Link to="/help" className="hover:underline">Help</Link></li>
        </ul>

        {menuOpen && (
          <ul className="flex flex-col px-6 py-4 gap-3 md:hidden bg-green-500">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link></li>
            <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
            <li><Link to="/tips" onClick={() => setMenuOpen(false)}>Tips</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/help" onClick={() => setMenuOpen(false)}>Help</Link></li>
            <li><Link to="/register?role=seller" onClick={() => setMenuOpen(false)}>Register as Seller</Link></li>
            <li><Link to="/register?role=buyer" onClick={() => setMenuOpen(false)}>Register as Buyer</Link></li>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link></li>
          </ul>
        )}
      </nav>
    </motion.header>
  );
}

export default Navbar;