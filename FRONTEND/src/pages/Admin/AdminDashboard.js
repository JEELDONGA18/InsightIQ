import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/sidebar.js";
import DashboardCard from "../../components/DashboardCard";
import Chart from "../../components/Chart";
import Table from "../../components/Table";
import DatePickerCard from "../../components/DatePickerCard";
import { adminDashboardData } from "../../utils/data";
import { useAdmin } from "../../context/AdminContext.js";

const AdminDashboard = () => {
  const {
    yearSummary,
    loading,
    monthwise,
    departmentPerformance,
    departmentYearTotals,
    serviceUtilization,
    fetchServiceUtilization,
  } = useAdmin();
  console.log("in app", departmentPerformance);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchServiceUtilization(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const columns = [
    { title: "Department", key: "departmentName" },
    { title: "Type", key: "type" },
    { title: "Amount", key: "amount" },
    { title: "Income", key: "income" },
    { title: "Expense", key: "expense" },
    { title: "Total", key: "total" },
    { title: "Date", key: "date" },
  ];

  const tableData = departmentPerformance.map((row, idx) => ({
    ...row,
    id: idx + 1, // or use row._id if available
    date: new Date(row.date).toLocaleDateString(),
  }));
  console.log("tableData", tableData);

  // Example: Filter data based on selected month & year
  // For demo, we just send the same data. You can implement your logic.
  const filteredData = adminDashboardData;

  const handleDateChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    // TODO: Fetch or filter dashboard data based on month & year
  };

  const deptLabels = departmentYearTotals.departments || [];
  const deptTotals = departmentYearTotals.total || [];

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar role="admin" />

      <main className="flex-1 p-4 md:ml-64 overflow-x-hidden">
        <div className="w-full max-w-[1600px] mx-auto border border-gray-800 p-5 rounded-xl shadow-md m-2">
          <section className="flex flex-col xl:flex-row gap-6 mb-6">
            {/* ...DashboardCards... */}
            <div className="flex flex-col gap-6 w-full xl:w-3/6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <DashboardCard
                  title="Current Year Income"
                  value={loading ? "Loading..." : `₹${yearSummary.income}`}
                  color="bg-green-600"
                />
                <DashboardCard
                  title="Current Year Expense"
                  value={loading ? "Loading..." : `₹${yearSummary.expense}`}
                  color="bg-red-600"
                />
                <DashboardCard
                  title="Net Total"
                  value={loading ? "Loading..." : `₹${yearSummary.total}`}
                  color="bg-cyan-600"
                />
              </div>

              <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                  Income & Expense Insights
                </h2>
                {/* Multi-line chart for income, expense, total */}
                <Chart
                  type="multi-line"
                  data={monthwise.months.map((month, idx) => ({
                    name: month,
                    income: monthwise.income[idx] ?? 0,
                    expense: monthwise.expense[idx] ?? 0,
                    total: monthwise.total[idx] ?? 0,
                  }))}
                  labels={monthwise.months}
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
                {serviceUtilization &&
                Array.isArray(serviceUtilization.data) &&
                serviceUtilization.data.length > 0 &&
                serviceUtilization.data.some((v) => Number(v) > 0) ? (
                  <Chart
                    type="doughnut"
                    data={serviceUtilization.data}
                    labels={serviceUtilization.labels}
                    compact
                  />
                ) : (
                  <div className="p-6 text-center text-gray-100">
                    Data not exist
                  </div>
                )}
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
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Department Performance (All Transactions)
              </h2>
              <Table columns={columns} data={tableData} />
            </div>

            {/* Team Performance (Department year totals as single-bar-per-dept) */}
            <div className="w-full xl:w-2/5 bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Department Year Performance (Current Year)
              </h2>

              {deptLabels.length === 0 ? (
                <div className="p-6 text-center text-gray-400">No data</div>
              ) : (
                <Chart
                  type="bar"
                  data={deptTotals}
                  labels={deptLabels}
                  compact
                />
              )}

              {/* Optional: small table below chart showing numbers */}
              <div className="mt-4 text-sm text-cyan-100">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-cyan-300">
                      <th className="pb-2">Department</th>
                      <th className="pb-2">Income</th>
                      <th className="pb-2">Expense</th>
                      <th className="pb-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentYearTotals.rows &&
                      departmentYearTotals.rows.map((r, i) => (
                        <tr key={i} className="border-t border-cyan-500/10">
                          <td className="py-2">{r.name}</td>
                          <td className="py-2">₹{r.income}</td>
                          <td className="py-2">₹{r.expense}</td>
                          <td
                            className={`py-2 ${
                              r.total < 0 ? "text-red-400" : "text-green-300"
                            }`}
                          >
                            ₹{r.total}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
