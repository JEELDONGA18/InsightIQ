// src/components/Chart.js
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const Chart = ({ type = "line", data = [], labels = [], compact = false }) => {
  const chartHeight = compact ? 200 : 340;

  // Multi-line support: if type is "multi-line", data is already formatted
  const formattedData = useMemo(() => {
    if (type === "multi-line") return data;
    if (
      !Array.isArray(data) ||
      !Array.isArray(labels) ||
      data.length === 0 ||
      labels.length === 0
    )
      return [];
    return labels.map((label, idx) => ({ name: label, value: data[idx] ?? 0 }));
  }, [data, labels, type]);

  if (!formattedData.length)
    return (
      <div className="text-cyan-300 text-center p-6">No data available</div>
    );

  const tooltipStyle = {
    backgroundColor: "rgba(17,24,39,0.95)",
    border: "1px solid #00ffff",
    borderRadius: "10px",
    color: "#e0f7faff",
    fontSize: "0.85rem",
    boxShadow: "0 0 20px rgba(0,255,255,0.4)",
    backdropFilter: "blur(8px)",
  };

  const chartWrapperStyle =
    "relative bg-gray-900/90 p-4 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.2)] border border-cyan-500/30 overflow-hidden";

  const neonGradient = (id, color1 = "#00ffff", color2 = "#00bcd4") => (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={color1} />
        <stop offset="100%" stopColor={color2} />
      </linearGradient>
    </defs>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={chartWrapperStyle}
      style={{ height: chartHeight }}
    >
      {/* Glow background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-cyan-400/10 blur-3xl"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <ResponsiveContainer width="100%" height="100%">
        {type === "multi-line" ? (
          <LineChart data={formattedData}>
            {neonGradient("incomeGradient", "#00ff99", "#00bcd4")}
            {neonGradient("expenseGradient", "#ff4d4d", "#ffb199")}
            {neonGradient("totalGradient", "#00ffff", "#00bcd4")}
            <CartesianGrid strokeDasharray="3 3" stroke="#00bcd420" />
            <XAxis dataKey="name" stroke="#80deea" tick={{ fill: "#b2ebf2" }} />
            <YAxis stroke="#80deea" tick={{ fill: "#b2ebf2" }} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: "#ffffff" }}
              itemStyle={{ color: "#ffffff" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="url(#incomeGradient)"
              strokeWidth={3}
              dot={{
                r: compact ? 3 : 6,
                fill: "#00ff99",
                stroke: "#00bcd4",
                strokeWidth: 2,
              }}
              activeDot={{
                r: compact ? 4 : 8,
                fill: "#00ff99",
                stroke: "#00bcd4",
                strokeWidth: 3,
              }}
              animationDuration={900}
            />
            <Line
              type="monotone"
              dataKey="expense"
              name="Expense"
              stroke="url(#expenseGradient)"
              strokeWidth={3}
              dot={{
                r: compact ? 3 : 6,
                fill: "#ff4d4d",
                stroke: "#ffb199",
                strokeWidth: 2,
              }}
              activeDot={{
                r: compact ? 4 : 8,
                fill: "#ff4d4d",
                stroke: "#ffb199",
                strokeWidth: 3,
              }}
              animationDuration={900}
            />
            <Line
              type="monotone"
              dataKey="total"
              name="Net Total"
              stroke="url(#totalGradient)"
              strokeWidth={3}
              dot={{
                r: compact ? 3 : 6,
                fill: "#00ffff",
                stroke: "#00bcd4",
                strokeWidth: 2,
              }}
              activeDot={{
                r: compact ? 4 : 8,
                fill: "#00e5ff",
                stroke: "#00bcd4",
                strokeWidth: 3,
              }}
              animationDuration={900}
            />
          </LineChart>
        ) : type === "line" ? (
          <LineChart data={formattedData}>
            {neonGradient("lineGradient")}
            <CartesianGrid strokeDasharray="3 3" stroke="#00bcd420" />
            <XAxis dataKey="name" stroke="#80deea" tick={{ fill: "#b2ebf2" }} />
            <YAxis stroke="#80deea" tick={{ fill: "#b2ebf2" }} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: "#ffffff" }}
              itemStyle={{ color: "#ffffff" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{
                r: compact ? 3 : 6,
                fill: "#00ffff",
                stroke: "#00bcd4",
                strokeWidth: 2,
              }}
              activeDot={{
                r: compact ? 4 : 8,
                fill: "#00e5ff",
                stroke: "#00bcd4",
                strokeWidth: 3,
              }}
              animationDuration={900}
              fill="url(#lineGradient)"
            />
          </LineChart>
        ) : type === "bar" ? (
          <BarChart data={formattedData}>
            {neonGradient("barGradient")}
            <CartesianGrid strokeDasharray="3 3" stroke="#00bcd420" />
            <XAxis dataKey="name" stroke="#80deea" tick={{ fill: "#b2ebf2" }} />
            <YAxis stroke="#80deea" tick={{ fill: "#b2ebf2" }} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: "#ffffff" }}
              itemStyle={{ color: "#ffffff" }}
            />
            <Bar
              dataKey="value"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              animationDuration={900}
              onMouseEnter={(e) => {}}
            />
          </BarChart>
        ) : type === "doughnut" ? (
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              innerRadius={compact ? 40 : 60}
              outerRadius={compact ? 70 : 110}
              dataKey="value"
              label={!compact}
              isAnimationActive
            >
              {formattedData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={`hsl(${180 + i * 15}, 100%, 55%)`}
                  stroke="#00ffff"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: "#ffffff" }}
              itemStyle={{ color: "#ffffff" }}
            />
            {!compact && <Legend wrapperStyle={{ color: "#00ffff" }} />}
          </PieChart>
        ) : (
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              innerRadius={compact ? 40 : 60}
              outerRadius={compact ? 70 : 110}
              dataKey="value"
              label={!compact}
              isAnimationActive
            >
              {formattedData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={`hsl(${180 + i * 15}, 100%, 55%)`}
                  stroke="#00ffff"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: "#ffffff" }}
              itemStyle={{ color: "#ffffff" }}
            />
            {!compact && <Legend wrapperStyle={{ color: "#00ffff" }} />}
          </PieChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  );
};

export default Chart;
