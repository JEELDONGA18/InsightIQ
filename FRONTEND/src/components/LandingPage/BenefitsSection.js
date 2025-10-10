// src/components/BenefitsSection.js
import React from "react";
import { motion } from "framer-motion";
import { LineChart, DollarSign, BarChart4, Rocket } from "lucide-react";

const benefits = [
  {
    icon: <LineChart size={38} className="text-cyan-400" />,
    title: "Data-Driven Decisions",
    desc: "Empower your organization to make smarter financial and operational choices with live analytics.",
  },
  {
    icon: <DollarSign size={38} className="text-cyan-400" />,
    title: "Boost Profit Margins",
    desc: "Uncover high-cost areas, optimize billing, and increase overall profitability using actionable insights.",
  },
  {
    icon: <BarChart4 size={38} className="text-cyan-400" />,
    title: "Operational Visibility",
    desc: "Gain full visibility into client performance, departmental budgets, and software usage trends.",
  },
  {
    icon: <Rocket size={38} className="text-cyan-400" />,
    title: "Accelerated Growth",
    desc: "Drive revenue with tools designed to help MSPs and IT leaders scale confidently with precision.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[200px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-4xl md:text-5xl font-bold text-center mb-14"
        >
          Why Choose <span className="text-cyan-400">InsightIQ?</span>
        </motion.h2>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: false }}
              className="p-8 rounded-2xl border border-cyan-400/30 bg-gray-900/40 shadow-lg hover:-translate-y-2 hover:shadow-cyan-400/20 transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;