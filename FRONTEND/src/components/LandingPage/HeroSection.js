// src/components/HeroSection.js
"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);
 
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white transition-all duration-500"
    >
      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="flex flex-col items-center text-center justify-center px-6 pt-40 md:pt-48 pb-24">
        <motion.h1
          data-aos="fade-up"
          className="text-4xl md:text-6xl font-extrabold max-w-3xl leading-tight"
        >
          Monitor the <span className="text-cyan-400">Insight</span> of Your MSP Growth
        </motion.h1>

        <motion.p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-gray-400 mt-6 max-w-2xl text-lg md:text-xl"
        >
          Gain complete visibility into profitability, client performance, and team efficiency — all
          in one smart dashboard built for MSPs.
        </motion.p>

        <motion.div
          data-aos="zoom-in"
          data-aos-delay="400"
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold shadow-lg transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition">
            Request a Demo
          </button>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-[300px] h-[300px] bg-cyan-400/10 blur-2xl rounded-full"></div>
      </div>
    </section>
  );
};

export default HeroSection;