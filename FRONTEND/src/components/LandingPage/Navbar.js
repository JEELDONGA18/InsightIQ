// src/components/Navbar.js
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-md bg-gray-900/50 border-b border-gray-800 fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-cyan-400">
        Insight<span className="text-white">IQ</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <a href="#features" className="text-gray-300 hover:text-cyan-400 transition">
          Features
        </a>
        <a href="#dashboard-preview" className="text-gray-300 hover:text-cyan-400 transition">
          Dashboard
        </a>
        <a href="#benefits" className="text-gray-300 hover:text-cyan-400 transition">
          Benefits
        </a>

        <a href="/login" className="text-gray-300 hover:text-cyan-400 transition font-medium">
          Login
        </a>
        <a
          href="/signup"
          className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl shadow-md transition"
        >
          Sign Up
        </a>
      </div>

      {/* Mobile Menu Placeholder */}
      <div className="md:hidden flex items-center gap-4">
        <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm">
          Menu
        </button>
      </div>
    </nav>
  );
};

export default Navbar;