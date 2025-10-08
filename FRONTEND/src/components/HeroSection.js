import React from "react";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white overflow-hidden">
      {/* Animated background (simple SVG lines as placeholder) */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#6366f1" fillOpacity="0.3" d="M0,160L48,165.3C96,171,192,181,288,165.3C384,149,480,107,576,117.3C672,128,768,192,864,197.3C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Monitor the Pulse of Your MSP Growth</h1>
        <p className="text-lg md:text-2xl mb-8 font-light max-w-2xl mx-auto">ProfitPulse gives you complete visibility into profitability, client performance, and team efficiency.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#cta" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform">Get Started</a>
          <a href="#cta" className="bg-white bg-opacity-10 border border-white text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-opacity-20 transition">Request a Demo</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
