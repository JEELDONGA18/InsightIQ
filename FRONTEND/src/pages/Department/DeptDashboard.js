import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/sidebar.js";
import Chart from "../../components/Chart";
import DashboardCard from "../../components/DashboardCard";
import DatePickerCard from "../../components/DatePickerCard";
import { deptDashboardData, deptReportsData } from "../../utils/data";

const DeptDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleDateChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    // TODO: filter data based on month/year if needed
  };

  // Merge data from deptDashboardData and deptReportsData
  const filteredData = {
    summaryCards: deptReportsData.summaryCards,
    budget: deptDashboardData.budgetVsActual,
    productivity: deptDashboardData.employeeProductivity,
    software: deptDashboardData.softwareUsage,
    clients: { 
      labels: deptDashboardData.clientData.map(c => c.Client),
      data: deptDashboardData.clientData.map(c => c.Projects)
    },
    optimizations: deptDashboardData.optimizationSuggestions.map(o => o.title)
  };

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

          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {filteredData.summaryCards?.map((card, idx) => (
              <DashboardCard key={idx} {...card} />
            ))}
          </div>

          {/* Charts Section */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* Budget vs Actual Spend */}
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Budget vs Actual Spend
              </h2>
              <Chart
                type="bar"
                data={filteredData.budget.actual}
                labels={filteredData.budget.labels}
              />
            </div>

            {/* Employee Productivity Metrics */}
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Employee Productivity Metrics
              </h2>
              <Chart
                type="line"
                data={filteredData.productivity.data}
                labels={filteredData.productivity.labels}
              />
            </div>

            {/* Software & License Usage */}
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Software & License Usage
              </h2>
              <Chart
                type="doughnut"
                data={filteredData.software.data}
                labels={filteredData.software.labels}
              />
            </div>

            {/* Client-related Data */}
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Client-related Data
              </h2>
              <Chart
                type="line"
                data={filteredData.clients.data}
                labels={filteredData.clients.labels}
              />
            </div>

            {/* Optimization Suggestions */}
            <div className="col-span-1 xl:col-span-2 bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Optimization Suggestions
              </h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {filteredData.optimizations?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
};

export default DeptDashboard;