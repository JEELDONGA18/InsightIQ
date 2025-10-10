// src/components/DashboardCard.js
import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

const DashboardCard = ({ title, value, change, trend }) => {
  const trendColor = trend === "up" ? "text-cyan-400" : "text-red-400";
  const TrendIcon = trend === "up" ? ArrowUp : ArrowDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-gray-900/90 border border-cyan-500/30 rounded-3xl p-4 shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-shadow duration-300 overflow-hidden"
    >
      {/* Glowing Background */}
      <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/20 via-transparent to-cyan-400/10 blur-3xl rounded-3xl"></div>

      {/* Card Content */}
      <div className="relative z-10 max-w-2xl">
        <h3 className="text-sm font-semibold text-cyan-200/80 mb-2">{title}</h3>
        <p className="text-xl font-bold text-cyan-100 mb-1">{value}</p>
        <span className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
          <TrendIcon size={14} />
          {change}
        </span>
      </div>
    </motion.div>
  );
};

export default DashboardCard;