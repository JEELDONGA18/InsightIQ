// src/components/TopNavbar.js
import React from "react";
import { Menu } from "lucide-react";

const TopNavbar = ({ toggleSidebar, role }) => {
  return (
    <div className="md:hidden flex items-center justify-between bg-gray-900/90 backdrop-blur-md text-white px-4 py-3 shadow-[0_0_25px_rgba(0,255,255,0.3)] fixed top-0 left-0 w-full z-50 border-b border-cyan-400/20">
      
      {/* Logo */}
      <div className="text-xl font-bold tracking-wide">
        Insight
        <span className="text-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          IQ
        </span>
      </div>

      {/* Hamburger button */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-cyan-400/20 transition"
      >
        <Menu size={24} className="text-cyan-400" />
      </button>
    </div>
  );
};

export default TopNavbar;