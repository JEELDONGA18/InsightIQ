// src/components/FeatureSection.js
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, PieChart, TrendingUp, Users } from "lucide-react";

const features = [
  {
    icon: <BarChart3 size={40} className="text-cyan-400" />,
    title: "Profitability Analytics",
    desc: "Track margins, identify top-performing clients, and uncover areas to improve profitability with real-time data.",
  },
  {
    icon: <Users size={40} className="text-cyan-400" />,
    title: "Client Performance Insights",
    desc: "Monitor client health and engagement metrics to retain high-value customers and scale your service impact.",
  },
  {
    icon: <PieChart size={40} className="text-cyan-400" />,
    title: "Department Spend Tracking",
    desc: "Gain visibility into budget allocation, usage trends, and optimize resource utilization across departments.",
  },
  {
    icon: <TrendingUp size={40} className="text-cyan-400" />,
    title: "MSP Growth Tools",
    desc: "Empower your sales and marketing agents with insights that fuel customer acquisition and revenue growth.",
  },
];

const FeatureSection = () => {
  return (
    <section id="features" className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[200px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Powerful <span className="text-cyan-400">Features</span> for Smarter Growth
        </motion.h2>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: false }}
              className="p-8 bg-gray-900/40 border border-cyan-400/30 rounded-2xl shadow-lg hover:shadow-cyan-400/20 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;