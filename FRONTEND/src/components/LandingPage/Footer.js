// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400 py-10 text-center">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo & Tagline */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-cyan-400 mb-2">InsightIQ</h3>
          <p className="text-sm text-gray-500">
            Empowering MSPs & IT Teams with Data-Driven Insights
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <a
            href="#features"
            className="hover:text-cyan-400 transition-all duration-300"
          >
            Features
          </a>
          <a
            href="#benefits"
            className="hover:text-cyan-400 transition-all duration-300"
          >
            Benefits
          </a>
          {/* <a
            href="contact"
            className="hover:text-cyan-400 transition-all duration-300"
          >
            Contact
          </a>
          <a
            href="privacy"
            className="hover:text-cyan-400 transition-all duration-300"
          >
            Privacy
          </a> */}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-8 pt-6">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} InsightIQ. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;