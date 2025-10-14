import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DepartmentContext = createContext();

export const useDepartments = () => useContext(DepartmentContext);

export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch departments on mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/host/adminpage", {
        withCredentials: true,
      });
      setDepartments(res.data.departments || []);
    } catch {
      setDepartments([]);
    }
    setLoading(false);
  };

  // Add department and update state
  const addDepartment = async (department) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/addDepartment",
        department,
        { withCredentials: true }
      );
      const data = res.data;
      if (res.status === 200) {
        setDepartments((prev) => [...prev, data.department]);
        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || "Failed to add department",
        };
      }
    } catch {
      return { success: false, message: "Network error" };
    }
  };

  return (
    <DepartmentContext.Provider value={{ departments, loading, addDepartment }}>
      {children}
    </DepartmentContext.Provider>
  );
};
