import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardCard from "../../components/DashboardCard";
import Chart from "../../components/Chart";
import Table from "../../components/Table";
import DatePickerCard from "../../components/DatePickerCard";
import { adminDashboardData } from "../../utils/data";

const AdminDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Example: Filter data based on selected month & year
  // For demo, we just send the same data. You can implement your logic.
  const filteredData = adminDashboardData; 

  const handleDateChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    // TODO: Fetch or filter dashboard data based on month & year
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar role="admin" />

      <main className="flex-1 p-4 md:ml-64 overflow-x-hidden">
        <div className="w-full max-w-[1600px] mx-auto border border-gray-800 p-5 rounded-xl shadow-md m-2">
          
          <section className="flex flex-col xl:flex-row gap-6 mb-6">
            <div className="flex flex-col gap-6 w-full xl:w-3/6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                {filteredData.profitability.map((card, idx) => (
                  <DashboardCard key={idx} {...card} />
                ))}
              </div>

              <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                  Income & Expense Insights
                </h2>
                <Chart
                  type="line"
                  data={filteredData.growthInsights.data}
                  labels={filteredData.growthInsights.labels}
                  compact
                />
              </div>
            </div>

            {/* Middle Column */}
            <div className="w-full xl:w-2/6 flex flex-col gap-4">
              {/* DatePicker Card */}
              <DatePickerCard
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onChange={handleDateChange}
              />

              {/* Doughnut Chart */}
              <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex-1">
                <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                  Service Utilization
                </h2>
                <Chart
                  type="doughnut"
                  data={filteredData.serviceUtilization.data}
                  labels={filteredData.serviceUtilization.labels}
                  compact
                />
              </div>
            </div>

            <div className="w-full xl:w-1/6 flex flex-col gap-6">
              <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex-1 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                <h2 className="text-xl font-semibold mb-3 text-cyan-400">
                  Predictive Insights
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {filteredData.predictiveInsights.map((card, idx) => (
                    <DashboardCard key={idx} {...card} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Client & Team Performance */} 
          <section className="flex flex-col xl:flex-row gap-6"> 
            {/* Client Performance */} 
            <div className="w-full xl:w-3/5 bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"> 
              <h2 className="text-xl font-semibold mb-4 text-cyan-400"> Client Performance </h2> 
              <Table columns={adminDashboardData.clientPerformance.columns} 
                data={adminDashboardData.clientPerformance.data} 
                actions={adminDashboardData.clientPerformance.actions} /> 
            </div>

            {/* Team Performance */} 
            <div className="w-full xl:w-2/5 bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"> 
              <h2 className="text-xl font-semibold mb-4 text-cyan-400"> Team Performance </h2> 
              <Chart type="bar" 
                data={adminDashboardData.teamPerformance.data} 
                labels={adminDashboardData.teamPerformance.labels} 
                compact /> 
            </div> 
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;