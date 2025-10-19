import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const DepartmentFinanceContext = createContext();
export const useDepartmentFinance = () => useContext(DepartmentFinanceContext);

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URI;
axios.defaults.withCredentials = true;

export const DepartmentFinanceProvider = ({ children }) => {
  const [finance, setFinance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  const fetchFinance = useCallback(async (id, month, year) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/host/department/${id}/finance-insights?month=${month}&year=${year}`
      );
      setFinance(res.data);
    } catch {
      setFinance(null);
    }
    setLoading(false);
  }, []);

  const fetchDepartmentTransactions = useCallback(async (id, month, year) => {
    setTransactionsLoading(true);
    try {
      let url = `/api/host/department/${id}/transactions`;
      if (month !== undefined && year !== undefined) {
        url += `?month=${month}&year=${year}`;
      }
      const res = await axios.get(url);
      setTransactions(res.data.transactions || []);
    } catch {
      setTransactions([]);
    }
    setTransactionsLoading(false);
  }, []);

  return (
    <DepartmentFinanceContext.Provider
      value={{
        finance,
        loading,
        fetchFinance,
        transactions,
        transactionsLoading,
        fetchDepartmentTransactions,
      }}
    >
      {children}
    </DepartmentFinanceContext.Provider>
  );
};
