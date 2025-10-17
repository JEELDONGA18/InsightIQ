import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/sidebar.js";
import Chart from "../../components/Chart";
import DatePickerCard from "../../components/DatePickerCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // <-- import the plugin

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [reportData, setReportData] = useState(null);
  const [prevReportData, setPrevReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams(); // department id from URL

  const handleDateChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");

    // compute previous month/year
    const prev = new Date(Number(selectedYear), Number(selectedMonth), 1);
    prev.setMonth(prev.getMonth() - 1);
    const prevMonth = prev.getMonth();
    const prevYear = prev.getFullYear();

    const currentReq = axios.get(
      `http://localhost:5000/api/host/department/${id}/report?month=${selectedMonth}&year=${selectedYear}`,
      { withCredentials: true }
    );
    const prevReq = axios.get(
      `http://localhost:5000/api/host/department/${id}/report?month=${prevMonth}&year=${prevYear}`,
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
    // remove non numeric except minus and dot
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

  // ...existing imports...

  const handleDownloadPDF = () => {
    if (!reportData) return;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Department Financial Report", 14, 16);

    // Department Info
    doc.setFontSize(12);
    doc.text(
      `Department: ${reportData.department.name || "-"} (${
        reportData.department.id
      })`,
      14,
      26
    );
    doc.text(`Manager: ${reportData.department.manager || "-"}`, 14, 34);
    doc.text(
      `Period: ${Number(reportData.month) + 1}/${reportData.year}`,
      14,
      42
    );

    // Summary Cards
    doc.setFontSize(14);
    doc.text("Summary", 14, 52);
    doc.setFont("helvetica", "normal"); // <-- set monospace font for summary
    doc.setFontSize(12);
    reportData.summaryCards.forEach((card, i) => {
      doc.text(`${card.title}: ${card.value}`, 14, 60 + i * 8);
    });
    doc.setFont("helvetica", "normal"); // <-- reset to default font after summary

    // Department Performance Chart Data
    doc.setFontSize(14);
    doc.text("Day-wise Net Performance", 14, 90);
    doc.setFontSize(10);
    const perfTable = [
      ["Day", "Net"],
      ...reportData.performance.labels.map((label, i) => [
        label,
        reportData.performance.data[i],
      ]),
    ];
    autoTable(doc, {
      startY: 96,
      head: [perfTable[0]],
      body: perfTable.slice(1),
      styles: { fontSize: 9 },
      theme: "striped",
      headStyles: { fillColor: [0, 255, 255] },
    });

    // Transactions Table
    let lastY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 120;
    doc.setFontSize(14);
    doc.text("Transactions", 14, lastY);
    autoTable(doc, {
      startY: lastY + 6,
      head: [["Date", "Type", "Amount", "Description"]],
      body: reportData.transactions.map((tx) => [
        new Date(tx.date).toLocaleDateString(),
        tx.type,
        tx.amount,
        tx.description,
      ]),
      styles: { fontSize: 10 },
      theme: "grid",
      headStyles: { fillColor: [0, 255, 255] },
    });

    // Save PDF
    doc.save(
      `Department_Report_${reportData.department.name}_${
        Number(reportData.month) + 1
      }_${reportData.year}.pdf`
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar role="deptHead" />

      <main className="flex-1 p-4 md:ml-64 overflow-x-hidden">
        <div className="w-full max-w-[1600px] mx-auto border border-gray-800 p-5 rounded-xl shadow-md m-2">
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

          {/* Loading/Error */}
          {loading && (
            <div className="p-6 text-center text-gray-400">Loading...</div>
          )}
          {error && <div className="p-6 text-center text-red-400">{error}</div>}

          {/* Reports Summary */}
          {reportData && (
            <>
              {/* Month-over-month banner */}
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

              {/* Charts / Analytics */}
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                {/* Department Performance Chart */}
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

              {/* Downloadable Reports */}
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
