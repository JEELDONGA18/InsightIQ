// src/components/DatePickerCard.js
import React from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DatePickerCard = ({ selectedMonth, selectedYear, onChange }) => {
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="bg-gray-900/90 border border-cyan-500 p-4 rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.4)] flex flex-col items-center gap-3 relative overflow-hidden">
      {/* Neon glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-cyan-400/10 blur-2xl pointer-events-none"></div>

      <h3 className="text-cyan-400 font-semibold text-sm z-10">Select Month & Year</h3>
      <div className="flex gap-2 z-10">
        <select
          value={selectedMonth}
          onChange={(e) => onChange(Number(e.target.value), selectedYear)}
          className="bg-gray-800 text-cyan-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400/70 hover:ring-cyan-400/50 transition-all"
        >
          {months.map((month, idx) => (
            <option
              key={idx}
              value={idx}
              className="bg-gray-900 text-gray-100"
            >
              {month}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => onChange(selectedMonth, parseInt(e.target.value))}
          className="bg-gray-800 text-cyan-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400/70 hover:ring-cyan-400/50 transition-all"
        >
          {years.map((year) => (
            <option
              key={year}
              value={year}
              className="bg-gray-900 text-gray-100"
            >
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DatePickerCard;