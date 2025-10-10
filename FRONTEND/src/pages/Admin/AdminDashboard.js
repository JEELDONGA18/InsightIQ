// src/pages/Admin/AdminDashboard.js
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardCard from "../../components/DashboardCard";
import Chart from "../../components/Chart";
import Table from "../../components/Table";
import { adminDashboardData } from "../../utils/data";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-950 text-cyan-100 pl-2 pt-2 pr-2">
      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main Content */}
      <main className="flex-1 p-3 md:ml-64 overflow-x-hidden">

        {/* Top Section: Profitability + Growth Insights (left) | Predictive Insights (middle) | Service Utilization (right) */}
        <section className="flex gap-4 mb-4">
          
          {/* Left Column (Profitability + Growth Insights) */}
          <div className="w-3/6 flex flex-col gap-4">
            {/* Profitability Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 bg-gray-900 p-4 rounded-xl shadow-lg">
              {adminDashboardData.profitability.map((card, idx) => (
                <DashboardCard key={idx} {...card} />
              ))}
            </div>

            {/* Growth Insights */}
            <div className="bg-gray-900 pt-4 pl-4 pr-4 pb-12 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-3 text-cyan-400">
                Growth Insights
              </h2>
              <Chart
                type="line"
                data={adminDashboardData.growthInsights.data}
                labels={adminDashboardData.growthInsights.labels}
                compact
              />
            </div>
          </div>

          {/* Middle Column (Predictive Insights) */}
          <div className="w-1/6 flex flex-col gap-4">
            <div className="bg-gray-900 p-4 rounded-xl shadow-lg flex-1 max-h-[600px] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-2 text-cyan-400">
                Predictive Insights
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {adminDashboardData.predictiveInsights.map((card, idx) => (
                  <DashboardCard key={idx} {...card} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Service Utilization) */}
          <div className="w-2/6 bg-gray-900 p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-cyan-400">
              Service Utilization
            </h2>
            <Chart
              type="doughnut"
              data={adminDashboardData.serviceUtilization.data}
              labels={adminDashboardData.serviceUtilization.labels}
              compact
            />
          </div>
        </section>

        {/* Client Performance + Team Performance side by side */}
        <section className="flex gap-4">
          {/* Client Performance (60%) */}
          <div className="w-3/5 bg-gray-900 p-4 rounded-xl shadow-lg overflow-x-auto">
            <h2 className="text-xl font-semibold mb-3 text-cyan-400">
              Client Performance
            </h2>
            <Table
              columns={adminDashboardData.clientPerformance.columns}
              data={adminDashboardData.clientPerformance.data}
              actions={adminDashboardData.clientPerformance.actions}
            />
          </div>

          {/* Team Performance (40%) */}
          <div className="w-2/5 bg-gray-900 p-4 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-cyan-400">
              Team Performance
            </h2>
            <Chart
              type="bar"
              data={adminDashboardData.teamPerformance.data}
              labels={adminDashboardData.teamPerformance.labels}
              compact
            />
          </div>
        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;