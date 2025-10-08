import React from "react";

const Footer = () => (
  <footer className="py-8 bg-gray-100 dark:bg-gray-900 text-center text-gray-600 dark:text-gray-400">
    <div className="max-w-6xl mx-auto px-4">
      <p className="mb-2">&copy; {new Date().getFullYear()} ProfitPulse. All rights reserved.</p>
      <div className="flex justify-center gap-4">
        <a href="#" className="hover:text-purple-600">Privacy Policy</a>
        <a href="#" className="hover:text-purple-600">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;
