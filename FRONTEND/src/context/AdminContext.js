import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URI;
axios.defaults.withCredentials = true;

export const AdminProvider = ({ children }) => {
  const [yearSummary, setYearSummary] = useState({
    income: 0,
    expense: 0,
    total: 0,
  });
  const [monthwise, setMonthwise] = useState({
    months: [],
    income: [],
    expense: [],
    total: [],
  });
  const [loading, setLoading] = useState(true);
  const [departmentPerformance, setDepartmentPerformance] = useState([]);
  const [serviceUtilization, setServiceUtilization] = useState({
    labels: ["Income", "Expense"],
    data: [0, 0],
  });
  const [departmentYearTotals, setDepartmentYearTotals] = useState({
    departments: [],
    income: [],
    expense: [],
    total: [],
    rows: [],
  });

  // stable fetch functions
  const fetchYearSummary = useCallback(async () => {
    try {
      const res = await axios.get("/api/host/currentYearSummary");
      setYearSummary(res.data || { income: 0, expense: 0, total: 0 });
    } catch {
      setYearSummary({ income: 0, expense: 0, total: 0 });
    }
  }, []);

  const fetchMonthwise = useCallback(async () => {
    try {
      const res = await axios.get("/api/host/monthwiseIncomeExpense");
      setMonthwise(
        res.data || { months: [], income: [], expense: [], total: [] }
      );
    } catch {
      setMonthwise({ months: [], income: [], expense: [], total: [] });
    }
  }, []);

  const fetchDepartmentPerformance = useCallback(async () => {
    try {
      const res = await axios.get("/api/host/departmentPerformance");
      setDepartmentPerformance(res.data.transactions || []);
    } catch {
      setDepartmentPerformance([]);
    }
  }, []);

  const fetchServiceUtilization = useCallback(async (month, year) => {
    try {
      const res = await axios.get(
        `/api/host/MonthYear?month=${month}&year=${year}`
      );
      setServiceUtilization(
        res.data || { labels: ["Income", "Expense"], data: [0, 0] }
      );
    } catch {
      setServiceUtilization({ labels: ["Income", "Expense"], data: [0, 0] });
    }
  }, []);
  const fetchDepartmentYearTotals = useCallback(async () => {
    try {
      const res = await axios.get("/api/host/departmentYearTotals");
      setDepartmentYearTotals(
        res.data || {
          departments: [],
          income: [],
          expense: [],
          total: [],
          rows: [],
        }
      );
    } catch {
      setDepartmentYearTotals({
        departments: [],
        income: [],
        expense: [],
        total: [],
        rows: [],
      });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchYearSummary(),
      fetchMonthwise(),
      fetchDepartmentPerformance(),
      fetchDepartmentYearTotals(),
    ]).finally(() => setLoading(false));
  }, [
    fetchYearSummary,
    fetchMonthwise,
    fetchDepartmentPerformance,
    fetchDepartmentYearTotals,
  ]);

  const value = useMemo(
    () => ({
      yearSummary,
      monthwise,
      loading,
      departmentPerformance,
      departmentYearTotals, // <-- expose to consumers
      serviceUtilization,
      fetchYearSummary,
      fetchMonthwise,
      fetchDepartmentPerformance,
      fetchDepartmentYearTotals, // <-- expose fetch
      fetchServiceUtilization,
    }),
    [
      yearSummary,
      monthwise,
      loading,
      departmentPerformance,
      serviceUtilization,
      fetchYearSummary,
      fetchMonthwise,
      fetchDepartmentPerformance,
      fetchDepartmentYearTotals,
      fetchServiceUtilization,
    ]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
