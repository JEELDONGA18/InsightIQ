// src/components/DashboardPreview.js
import React from "react";
import { motion } from "framer-motion";
import dashboardImg from "../../assets/dashboard-preview.png"; 

const DashboardPreview = () => {
  return (
    <section id="dashboard-preview" className="relative py-28 bg-gradient-to-b from-black via-gray-950 to-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.08),_transparent_60%)]"></div>

      <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Your Business <span className="text-cyan-400">At a Glance</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: false }}
          className="text-gray-400 text-lg max-w-3xl mx-auto mb-12"
        >
          Visualize key insights like profitability, departmental spend, and client performance — all in one sleek dashboard.
        </motion.p>

        {/* Dashboard Image Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false }}
          className="relative flex justify-center"
        >
          {/* Glowing border effect */}
          <div className="absolute inset-0 w-[85%] mx-auto h-[100%] bg-cyan-400/10 blur-[120px] rounded-3xl"></div>

          <img
            src={dashboardImg}
            alt="InsightIQ Dashboard Preview"
            className="rounded-3xl border border-cyan-400/20 shadow-2xl hover:scale-[1.02] transition-transform duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;