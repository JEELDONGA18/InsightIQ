import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

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
        toast.success("Department added successfully");
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

  // Edit department and update state
  const editDepartment = async (id, department) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/host/editDepartment/${id}`,
        department,
        { withCredentials: true }
      );
      const data = res.data;
      if (res.status === 200) {
        setDepartments((prev) =>
          prev.map((d) => (d._id === id ? data.department : d))
        );
        toast.success("Department updated successfully");
        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || "Failed to update department",
        };
      }
    } catch {
      return { success: false, message: "Network error" };
    }
  };

  const deleteDepartment = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/host/deleteDepartment/${id}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setDepartments((prev) => prev.filter((d) => d._id !== id));
        toast.success("Department deleted successfully");
        return { success: true };
      } else {
        return {
          success: false,
          message: res.data.message || "Failed to delete department",
        };
      }
    } catch {
      return { success: false, message: "Network error" };
    }
  };

  return (
    <DepartmentContext.Provider
      value={{
        departments,
        loading,
        addDepartment,
        editDepartment,
        deleteDepartment,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};
