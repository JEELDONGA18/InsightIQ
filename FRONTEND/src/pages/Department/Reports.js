// src/pages/Department/Reports.js
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Chart from "../../components/Chart";
import DatePickerCard from "../../components/DatePickerCard";
import { deptReportsData } from "../../utils/data";

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleDateChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    // TODO: Filter / fetch reports data based on selection
  };

  const filteredData = deptReportsData; // Replace with actual filtering logic

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar role="deptHead" />

      <main className="flex-1 p-4 md:ml-64 overflow-x-hidden">
        <div className="w-full max-w-[1600px] mx-auto border border-gray-800 p-5 rounded-xl shadow-md m-2">

          {/* Date Picker */}
          <div className="mb-6 w-full xl:w-2/6">
            <DatePickerCard
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onChange={handleDateChange}
            />
          </div>

          {/* Reports Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {filteredData.summaryCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-sm text-gray-400">{card.title}</h3>
                <p className="text-xl font-semibold text-cyan-400">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Charts / Analytics */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

            {/* Department Performance Chart */}
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Department Performance
              </h2>
              <Chart
                type="line"
                data={filteredData.performance.data}
                labels={filteredData.performance.labels}
              />
            </div>

            {/* Resource Usage Chart */}
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Resource Usage
              </h2>
              <Chart
                type="doughnut"
                data={filteredData.resources.data}
                labels={filteredData.resources.labels}
              />
            </div>
          </section>

          {/* Downloadable Reports */}
          <section className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">
              Download Reports
            </h2>
            <ul className="space-y-2 text-gray-300">
              {filteredData.downloads.map((report, idx) => (
                <li key={idx} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-md hover:bg-gray-800/70 transition">
                  <span>{report.name}</span>
                  <a
                    href={report.link}
                    download
                    className="px-3 py-1 bg-cyan-500/30 hover:bg-cyan-500/50 rounded-md text-cyan-200 transition shadow-[0_0_10px_rgba(0,255,255,0.4)]"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Reports;