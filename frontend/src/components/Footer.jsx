import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-green-500 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between">
        {/* Left 4 columns */}
        <div className="mt-8 md:mt-0 text-right">
          <h2 className="text-3xl font-bold">Fram Grove</h2>

        </div>

        <div className="flex flex-wrap gap-16">
          <div>
            <h4 className="text-xl font-bold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/shop" className="hover:underline">Shop</Link></li>
              <li><Link to="/categories" className="hover:underline">Categories</Link></li>
              <li><Link to="/tips" className="hover:underline">Tips</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">Our Story</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: support@fromgrove.com</li>
              <li>Phone: +91 123 456 7890</li>
              <li>Location: Bangalore, India</li>
            </ul>
          </div>
        </div>

        {/* Right Logo */}
        
      </div>
    </footer>
  );
}

export default Footer;