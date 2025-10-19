import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/sidebar.js";
import Chart from "../../components/Chart";
import DashboardCard from "../../components/DashboardCard";
import DatePickerCard from "../../components/DatePickerCard";
import { deptDashboardData, deptReportsData } from "../../utils/data";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/Modal.js";
import toast from "react-hot-toast";
import { useDepartmentFinance } from "../../context/DepartmentFinanceContext.js";
import Table from "../../components/Table";

const DeptDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { id } = useParams();
  const {
    finance,
    loading: financeLoading,
    fetchFinance,
    transactions,
    transactionsLoading,
    fetchDepartmentTransactions,
  } = useDepartmentFinance();

  useEffect(() => {
    if (id) {
      fetchFinance(id, selectedMonth, selectedYear);
      fetchDepartmentTransactions(id, selectedMonth, selectedYear);
    }
  }, [
    id,
    selectedMonth,
    selectedYear,
    fetchFinance,
    fetchDepartmentTransactions,
  ]);

  // Add Transaction Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // Modal handlers
  const openModal = () => {
    setForm({
      type: "income",
      amount: "",
      description: "",
      date: new Date().toISOString().slice(0, 10),
    });
    setFormError("");
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);

    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setFormError("Amount must be a positive number.");
      setFormLoading(false);
      return;
    }
    if (!id) {
      setFormError("Department ID missing.");
      setFormLoading(false);
      return;
    }
    try {
      await axios.post(
        "https://insightiq-backend-4otj.onrender.com/api/host/addTransaction",
        {
          department: id,
          type: form.type,
          amount: Number(form.amount),
          description: form.description,
          date: form.date,
        },
        { withCredentials: true }
      );
      toast.success("Transaction added successfully");
      closeModal();
      // Optionally: refresh dashboard data here
    } catch (err) {
      setFormError(
        err?.response?.data?.message || "Failed to add transaction."
      );
    }
    setFormLoading(false);
  };

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
      labels: deptDashboardData.clientData.map((c) => c.Client),
      data: deptDashboardData.clientData.map((c) => c.Projects),
    },
    optimizations: deptDashboardData.optimizationSuggestions.map(
      (o) => o.title
    ),
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar role="deptHead" />

      <main className="flex-1 p-4 md:ml-64 overflow-x-hidden">
        <div className="w-full max-w-[1600px] mx-auto border border-gray-800 p-5 rounded-xl shadow-md m-2">
          {/* Header: Department name + Add Transaction */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">
              {finance?.department?.name
                ? `${finance.department.name} Department`
                : "Department Dashboard"}
            </h1>
            <button
              onClick={openModal}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-2xl shadow-[0_0_15px_rgba(0,255,255,0.4)] font-medium transition-shadow duration-300"
            >
              + Add Transaction
            </button>
          </div>

          {/* Add Transaction Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="Add Transaction"
          >
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <select
                name="type"
                value={form.type}
                onChange={handleFormChange}
                className="p-2 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
                required
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleFormChange}
                className="p-2 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
                required
                min={1}
              />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleFormChange}
                className="p-2 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleFormChange}
                className="p-2 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
              />
              {formError && (
                <div className="text-red-500 text-sm">{formError}</div>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.4)] font-medium transition-shadow duration-300"
                disabled={formLoading}
              >
                {formLoading ? "Saving..." : "Add Transaction"}
              </button>
            </form>
          </Modal>

          {/* Date Picker */}
          <div className="mb-6 flex justify-center w-full">
            <div className="w-full xl:w-2/6">
              <DatePickerCard
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onChange={handleDateChange}
              />
            </div>
          </div>
          {/* Department Finance Insights */}
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mt-8 mb-4">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">
              Department Finance Insights ({selectedMonth + 1}/{selectedYear})
            </h2>
            {financeLoading ? (
              <div className="p-6 text-center text-gray-400">Loading...</div>
            ) : finance ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <DashboardCard
                    title="Total Income"
                    value={`₹${finance.totalIncome}`}
                    color="bg-green-600"
                  />
                  <DashboardCard
                    title="Total Expense"
                    value={`₹${finance.totalExpense}`}
                    color="bg-red-600"
                  />
                  <DashboardCard
                    title="Net"
                    value={`₹${finance.net}`}
                    color={finance.net < 0 ? "bg-red-600" : "bg-cyan-600"}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-cyan-300 mb-4">Day-wise Income</h3>
                    <Chart
                      type="line"
                      data={finance.dayWiseIncome}
                      labels={finance.days.map((d) => `Day ${d}`)}
                      compact
                    />
                  </div>
                  <div>
                    <h3 className="text-cyan-300 mb-4">Day-wise Expense</h3>
                    <Chart
                      type="line"
                      data={finance.dayWiseExpense}
                      labels={finance.days.map((d) => `Day ${d}`)}
                      compact
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 text-center text-gray-400">
                No data for this month.
              </div>
            )}
          </div>

          {/* Charts Section */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Pie Chart for Income vs Expense */}
            <div className="mb-8">
              <h3 className="text-cyan-300 mb-4">
                Income vs Expense (Pie Chart)
              </h3>
              {finance && (finance.totalIncome || finance.totalExpense) ? (
                <Chart
                  type="doughnut"
                  data={[finance.totalIncome, finance.totalExpense]}
                  labels={["Income", "Expense"]}
                  compact
                />
              ) : (
                <div className="text-cyan-300">No data available</div>
              )}
            </div>

            <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mt-8 mb-4">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Transaction History ({selectedMonth + 1}/{selectedYear})
              </h2>
              {transactionsLoading ? (
                <div className="p-6 text-center text-gray-400">Loading...</div>
              ) : transactions && transactions.length > 0 ? (
                <Table
                  columns={[
                    { title: "Date", key: "date" },
                    { title: "Type", key: "type" },
                    { title: "Amount", key: "amount" },
                    { title: "Description", key: "description" },
                  ]}
                  data={transactions.map((tx) => ({
                    ...tx,
                    date: new Date(tx.date).toLocaleDateString(),
                  }))}
                />
              ) : (
                <div className="p-6 text-center text-gray-400">
                  No transactions found.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DeptDashboard;
