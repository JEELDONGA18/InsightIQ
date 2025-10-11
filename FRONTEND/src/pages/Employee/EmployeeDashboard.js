// src/pages/Employee/EmployeeDashboard.js
import React from "react";
import Sidebar from "../../components/Sidebar/sidebar.js";
import DashboardCard from "../../components/DashboardCard";
import Chart from "../../components/Chart";
import Table from "../../components/Table";
import { employeeDashboardData } from "../../utils/data";

const EmployeeDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar role="employee" />

      <main className="flex-1 p-4 md:ml-64 overflow-x-hidden">
        <div className="w-full max-w-[1600px] mx-auto border border-gray-800 p-5 rounded-xl shadow-md m-2">

          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {employeeDashboardData.summaryCards.map((card, idx) => (
              <DashboardCard key={idx} {...card} />
            ))}
          </div>

          {/* Task List Table */}
          <div className="mb-6 bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Daily / Weekly Tasks</h2>
            <Table
              columns={employeeDashboardData.tasks.columns.map(col => ({
                title: col,
                key: col
              }))}
              data={employeeDashboardData.tasks.data || []}
            />
          </div>

          {/* Performance Chart */}
          <div className="mb-6 bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Performance & KPI</h2>
            <Chart
              type="line"
              labels={employeeDashboardData.performance.labels || []}
              data={employeeDashboardData.performance.data || []}
            />
          </div>

          {/* Leads / Assigned Clients Table */}
          <div className="mb-6 bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Leads / Campaigns</h2>
            <Table
              columns={employeeDashboardData.assignedClients.columns.map(col => ({
                title: col,
                key: col
              }))}
              data={employeeDashboardData.assignedClients.data || []}
            />
          </div>

          {/* Communication Feed */}
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Communication Feed</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {(employeeDashboardData.communicationFeed || []).map((msg, idx) => (
                <li key={idx}>
                  <strong>{msg.sender}:</strong> {msg.message} <em>({msg.date})</em>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;