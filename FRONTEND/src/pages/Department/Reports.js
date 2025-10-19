import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/sidebar.js";
import Chart from "../../components/Chart";
import DatePickerCard from "../../components/DatePickerCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Chart as ChartJS } from "chart.js/auto";

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [reportData, setReportData] = useState(null);
  const [prevReportData, setPrevReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  const handleDateChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    const prev = new Date(Number(selectedYear), Number(selectedMonth), 1);
    prev.setMonth(prev.getMonth() - 1);
    const prevMonth = prev.getMonth();
    const prevYear = prev.getFullYear();
    const currentReq = axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/api/host/department/${id}/report?month=${selectedMonth}&year=${selectedYear}`,
      { withCredentials: true }
    );
    const prevReq = axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/api/host/department/${id}/report?month=${prevMonth}&year=${prevYear}`,
      { withCredentials: true }
    );
    Promise.all([currentReq, prevReq])
      .then(([curRes, prevRes]) => {
        setReportData(curRes.data);
        setPrevReportData(prevRes.data);
      })
      .catch((err) =>
        setError(err?.response?.data?.message || "Failed to fetch report.")
      )
      .finally(() => setLoading(false));
  }, [id, selectedMonth, selectedYear]);

  const parseCurrencyVal = (val) => {
    if (val == null) return 0;
    if (typeof val === "number") return val;
    const num = Number(String(val).replace(/[^0-9.-]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const getNetFromSummary = (data) => {
    if (!data?.summaryCards) return 0;
    const card = data.summaryCards.find((c) => /net/i.test(c.title));
    return parseCurrencyVal(card?.value);
  };

  const currentNet = getNetFromSummary(reportData);
  const previousNet = getNetFromSummary(prevReportData);
  const percentChange =
    previousNet !== 0
      ? (((currentNet - previousNet) / Math.abs(previousNet)) * 100).toFixed(2)
      : null;

  const handleDownloadPDF = async () => {
    if (!reportData) return;
    const doc = new jsPDF();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const printDate = new Date().toLocaleString();
    const monthName = monthNames[Number(reportData.month)] || "Unknown";

    doc.setFontSize(14);
    doc.text("Department Financial Report", 14, 14);
    doc.setFontSize(10);
    doc.text(
      `Department: ${reportData?.department?.name || "Unknown"}`,
      14,
      22
    );
    doc.text(`Month: ${monthName} ${reportData.year}`, 14, 28);
    doc.text(`Printed on: ${printDate}`, 14, 34);

    let lastY = 40;

    const totalIncome = (reportData?.transactions || [])
      .filter((tx) => tx.type.toLowerCase() === "income")
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
    const totalExpense = (reportData?.transactions || [])
      .filter((tx) => tx.type.toLowerCase() === "expense")
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
    const netTotal = totalIncome - totalExpense;

    autoTable(doc, {
      startY: lastY,
      head: [["Total Income", "Total Expense", "Net Total"]],
      body: [
        [totalIncome.toFixed(2), totalExpense.toFixed(2), netTotal.toFixed(2)],
      ],
      theme: "grid",
      headStyles: { fillColor: [0, 255, 255], fontSize: 9 },
      styles: { fontSize: 9 },
    });

    lastY = doc.lastAutoTable.finalY + 8;

    doc.setFontSize(10);
    doc.text("Transaction Statement", 14, lastY);

    const dailySummary = {};
    (reportData.transactions || []).forEach((tx) => {
      const date = new Date(tx.date).toLocaleDateString("en-GB");
      if (!dailySummary[date]) dailySummary[date] = { income: 0, expense: 0 };
      if (tx.type.toLowerCase() === "income")
        dailySummary[date].income += Number(tx.amount);
      else if (tx.type.toLowerCase() === "expense")
        dailySummary[date].expense += Number(tx.amount);
    });
    const statementTable = Object.entries(dailySummary).map(([date, vals]) => [
      date,
      vals.income.toFixed(2),
      vals.expense.toFixed(2),
    ]);
    autoTable(doc, {
      startY: lastY + 4,
      head: [["Date", "Income", "Expense"]],
      body: statementTable,
      theme: "grid",
      headStyles: { fillColor: [0, 255, 255], fontSize: 8 },
      styles: { fontSize: 8 },
    });
    doc.save(
      `Department_Report_${
        reportData?.department?.name || "Dept"
      }_${monthName}_${reportData.year}.pdf`
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar role="deptHead" />
      <main className="flex-1 p-4 md:ml-64 overflow-x-hidden">
        <div className="w-full max-w-[1600px] mx-auto border border-gray-800 p-5 rounded-xl shadow-md m-2">
          <div className="mb-6 flex justify-center w-full">
            <div className="w-full xl:w-2/6">
              <DatePickerCard
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onChange={handleDateChange}
              />
            </div>
          </div>
          {loading && (
            <div className="p-6 text-center text-gray-400">Loading...</div>
          )}
          {error && <div className="p-6 text-center text-red-400">{error}</div>}
          {reportData && (
            <>
              <div className="mb-4">
                {percentChange === null ? (
                  <div className="text-sm text-gray-400">
                    From last month we profit N/A
                  </div>
                ) : (
                  <div
                    className={`text-sm font-semibold ${
                      Number(percentChange) < 0
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    From last month we profit {percentChange}%
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                {reportData.summaryCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="text-sm text-gray-400">{card.title}</h3>
                    <p className="text-xl font-semibold text-cyan-400">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                    Department Performance
                  </h2>
                  <Chart
                    type="line"
                    data={reportData.performance.data}
                    labels={reportData.performance.labels}
                  />
                </div>
              </section>
              <section className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                  Download Reports
                </h2>
                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-white font-medium shadow"
                >
                  Download PDF
                </button>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reports;
