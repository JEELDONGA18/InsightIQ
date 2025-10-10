// src/components/CTASection.js
import React from "react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="relative py-28 bg-gradient-to-b from-black via-gray-950 to-black text-white overflow-hidden text-center">
      {/* Glowing Background Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.1),_transparent_60%)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="max-w-4xl mx-auto relative z-10 px-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to <span className="text-cyan-400">Grow Smarter?</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Join InsightIQ today and unlock real-time insights that empower your MSP
          and IT teams to make confident, data-driven business decisions.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="px-8 py-4 bg-cyan-400 text-black font-semibold rounded-xl shadow-lg hover:bg-cyan-300 transition-all duration-300"
        >
          Get Started — It’s Free
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CTASection;