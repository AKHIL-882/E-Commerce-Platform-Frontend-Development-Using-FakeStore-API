import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section: Links */}
          <div className="flex space-x-8">
            <Link
              to="/"
              className="text-white text-lg font-medium hover:text-gray-200"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="text-white text-lg font-medium hover:text-gray-200"
            >
              Cart
            </Link>
            <Link
              to="/wishlist"
              className="text-white text-lg font-medium hover:text-gray-200"
            >
              Wishlist
            </Link>
          </div>

          {/* Right Section: Login/Logout */}
          <div>
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="text-white text-lg font-medium hover:text-gray-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-white text-lg font-medium hover:text-gray-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
